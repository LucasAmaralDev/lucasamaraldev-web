export default function CardHabilidades({ title, skills, background }: { title: string, skills: string[], background: string }) {
    // Mapeia o background para as classes corretas para evitar o problema com o purge do Tailwind
    const getBackgroundGradient = () => {
        switch (background) {
            case 'blue':
                return 'from-gray-50 to-blue-50';
            case 'green':
                return 'from-gray-50 to-green-50';
            case 'purple':
                return 'from-gray-50 to-purple-50';
            case 'red':
                return 'from-gray-50 to-red-50';
            case 'yellow':
                return 'from-gray-50 to-yellow-50';
            default:
                return 'from-gray-50 to-blue-50';
        }
    };

    const getTitleColor = () => {
        switch (background) {
            case 'blue':
                return 'text-blue-600';
            case 'green':
                return 'text-green-600';
            case 'purple':
                return 'text-purple-600';
            case 'red':
                return 'text-red-600';
            case 'yellow':
                return 'text-yellow-600';
            default:
                return 'text-blue-600';
        }
    };

    const getBulletColor = () => {
        switch (background) {
            case 'blue':
                return 'before:text-blue-500';
            case 'green':
                return 'before:text-green-500';
            case 'purple':
                return 'before:text-purple-500';
            case 'red':
                return 'before:text-red-500';
            case 'yellow':
                return 'before:text-yellow-500';
            default:
                return 'before:text-blue-500';
        }
    };

    return (
        <div className={`bg-gradient-to-br ${getBackgroundGradient()} p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all`}>
            <h3 className={`${getTitleColor()} mb-4 text-center font-semibold`}>{title}</h3>
            <ul className="list-none">
                {skills.map((skill, index) => (
                    <li key={index} className={`py-2 pl-6 relative before:content-['•'] ${getBulletColor()} before:font-bold before:absolute before:left-0 text-gray-700`}>
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}
