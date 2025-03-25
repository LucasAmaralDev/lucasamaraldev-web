
export default function CardInfo({ title, value }: { title: string, value: string }) {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
            <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
            <div className="text-gray-700">{title}</div>
        </div>
    )
}
