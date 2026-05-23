import { useAppStore } from "../stores/useAppStore";

export default function GenerateAI() {

    const { showNotification, generateRecipe, recipe, isGenerating } = useAppStore();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const prompt = form.get('prompt') as string;

        if (prompt.trim() === '') {
            showNotification({
                text: "La búsqueda no puede ir vacía",
                error: true
            });
            return;
        }

        await generateRecipe(prompt);
    }

    return (
        <div className=" container mx-auto px-3">
            <h1 className="text-6xl font-extrabold">Generar Receta con IA</h1>

            <div className="max-w-4xl mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col space-y-3 py-10'
                >
                    <div className="relative">
                        <input
                            name="prompt"
                            id="prompt"
                            className="border bg-white p-4 rounded-lg w-full border-slate-800"
                            placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
                        />
                        <button
                            type="submit"
                            aria-label="Enviar"
                            className={`cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 disabled:cursor-not-allowed disabled:opacity-50`}
                            disabled={isGenerating}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                </form>

                {isGenerating && (
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <p className="animate-pulse">Generando receta...</p>
                        <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}

                <div className="py-10 whitespace-pre-wrap">
                    {recipe}
                </div>
            </div>

        </div>
    )
}