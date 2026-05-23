import {streamText} from 'ai';
import { openRouter } from '../lib/ai';

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openRouter('openai/gpt-oss-120b:free'),
            prompt,
            system: "Eres un experto mixólogo. Tu tarea es generar una receta de bebida basada en el prompt que te doy. La receta debe incluir el nombre de la bebida, los ingredientes necesarios y las instrucciones para prepararla. Asegúrate de que la receta sea clara y fácil de seguir.",
            temperature: 1,
        })

        return result.textStream;
    }
}