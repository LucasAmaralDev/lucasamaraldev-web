import { IconType } from 'react-icons'
import { FaCode, FaDatabase, FaNodeJs, FaReact, FaServer } from 'react-icons/fa'

export default function ComponentsAreaAtuacao({ areasAtuacao }: { areasAtuacao: { text: string, icon: string, color: string }[] }) {

    const mappedIcons: { icon: string, component: IconType }[] = [
        { icon: "FaReact", component: FaReact },
        { icon: "FaNodeJs", component: FaNodeJs },
        { icon: "FaDatabase", component: FaDatabase },
        { icon: "FaServer", component: FaServer },
        { icon: "FaCode", component: FaCode }
    ]

    const getIconComponent = (iconName: string, color: string) => {
        const iconObj = mappedIcons.find(icon => icon.icon === iconName);
        const IconComponent = iconObj?.component;
        return IconComponent ? <IconComponent size={20} color={color || "darkyellow"} /> : null;
    }



    return (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-blue-600 font-semibold mb-4 text-center">Áreas de Atuação</h3>
            <ul className="space-y-3">
                {areasAtuacao.map((area, index) => {

                    return (
                        <li key={index} className="flex items-center text-gray-700">
                            <div className="mr-3">
                                {getIconComponent(area.icon, area.color)}
                            </div>
                            <span>{area.text}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
