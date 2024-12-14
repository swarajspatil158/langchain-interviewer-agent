import {
    Message as VercelChatMessage,
    StreamingTextResponse,
    createStreamDataTransformer
} from 'ai';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { HttpResponseOutputParser } from 'langchain/output_parsers';

import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RunnableSequence } from '@langchain/core/runnables'
import { formatDocumentsAsString } from 'langchain/util/document';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { interviewerPersonaTemplate } from '@/templates/interviewerPersona';
import { candidateData, jobData } from '@/data/environment';


export const dynamic = 'force-dynamic'

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};


export async function POST(req: Request) {
    try {
        // Extract the `messages` from the body of the request
        const { messages } = await req.json();

        const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);

        const currentMessageContent = messages[messages.length - 1].content;


        const prompt = PromptTemplate.fromTemplate(interviewerPersonaTemplate);

        const model = new ChatOpenAI({
            apiKey: process.env.OPENAI_API_KEY!,
            model: 'gpt-4o',
            temperature: 0,
            streaming: true,
            verbose: true,
        });

        /**
       * Chat models stream message chunks rather than bytes, so this
       * output parser handles serialization and encoding.
       */
        const parser = new HttpResponseOutputParser();

        const chain = RunnableSequence.from([
            {
                question: (input) => input.question,
                chat_history: (input) => input.chat_history,
                start_timestamp: (input) => {
                    const messages = input.chat_history.split('\n');
                    return messages.length > 0 ? 
                        input.chat_history_timestamps?.[0] || new Date().toISOString() :
                        new Date().toISOString();
                },
                current_timestamp: () => new Date().toISOString(),
                time_elapsed_minutes: (input) => {
                    const startTime: any = new Date(input.chat_history_timestamps?.[0] || new Date());
                    const currentTime: any = new Date();
                    return Math.floor((currentTime - startTime) / (1000 * 60));
                },
                currentStage: () => jobData.currentStage,
                jobTitle: () => jobData.jobTitle,
                jobLevel: () => jobData.jobLevel,
                roleCategory: () => jobData.roleCategory,
                department: () => jobData.department,
                employmentType: () => jobData.employmentType,
                yearsOfExperience: () => jobData.yearsOfExperience,
                workSetup: () => jobData.workSetup,
                workLocation: () => jobData.workLocation,
                ctcRange: () => jobData.ctcRange,
                jobSummary: () => jobData.jobSummary,
                jobResponsibilities: () => jobData.jobResponsibilities,
                jobRequirements: () => jobData.jobRequirements,
                desiredKeySkills: () => jobData.desiredKeySkills,
                
                
                name: () => candidateData.name,
                email: () => candidateData.email,
                phone: () => candidateData.phone,
                city: () => candidateData.city,
                region: () => candidateData.region,
                country: () => candidateData.country,
                totalYearsOfExperience: () => candidateData.totalYearsOfExperience,
                currentRole: () => candidateData.currentRole,
                currentCompany: () => candidateData.currentCompany,
                degree: () => candidateData.degree,
                field: () => candidateData.field,
                institution: () => candidateData.institution,
                graduationYear: () => candidateData.graduationYear,
                programmingLanguages: () => candidateData.programmingLanguages,
                frameworks: () => candidateData.frameworks,
                databases: () => candidateData.databases,
                technologies: () => candidateData.technologies,
                workExperienceCompany: () => candidateData.workExperienceCompany,
                workExperienceRole: () => candidateData.workExperienceRole,
                workExperienceDuration: () => candidateData.workExperienceDuration,
                workExperienceResponsibilities: () => candidateData.workExperienceResponsibilities,
                linkedin: () => candidateData.linkedin,
                github: () => candidateData.github
            },
            prompt,
            model,
            parser,
        ]);

        // Convert the response into a friendly text-stream
        const stream = await chain.stream({
            chat_history: formattedPreviousMessages.join('\n'),
            question: currentMessageContent,
        });

        // Respond with the stream
        return new StreamingTextResponse(
            stream.pipeThrough(createStreamDataTransformer()),
        );
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: e.status ?? 500 });
    }
}