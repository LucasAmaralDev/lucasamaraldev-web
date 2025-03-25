
export default function CardExperiencia({ empresa, cargo, periodo, local, descricao, atividades }: { empresa: string, cargo: string, periodo: string, local: string, descricao: string, atividades: string[] }) {
    return (
        <div className="mb-10 pb-8 border-b border-gray-200">
            <div className="mb-4">
                <h3 className="text-blue-700 mb-2 text-xl font-semibold">{cargo}</h3>
                <span className="font-bold text-blue-500 mr-4">{empresa}</span>
                <span className="text-gray-500 text-sm block mt-2">{periodo} | {local}</span>
            </div>
            <p className="text-gray-700 mb-4">
                {descricao}
            </p>
            <ul className="pl-6">
                {atividades.map((atividade, index) => (
                    <li key={index} className="mb-2 text-gray-700">{atividade}</li>
                ))}
            </ul>
        </div>
    )
}
