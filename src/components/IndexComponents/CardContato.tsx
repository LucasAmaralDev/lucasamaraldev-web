import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

export default function CardContato({ icon, title, value, link }: { icon: string, title: string, value: string, link: string }) {


    const mappedIcons: { icon: string, component: IconType }[] = [
        { icon: "FaEnvelope", component: FaEnvelope },
        { icon: "FaLinkedin", component: FaLinkedin },
        { icon: "FaGithub", component: FaGithub },
        { icon: "FaWhatsapp", component: FaWhatsapp },
    ]

    const getIconComponent = (iconName: string) => {
        const iconObj = mappedIcons.find(icon => icon.icon === iconName);
        const IconComponent = iconObj?.component;
        return IconComponent ? <IconComponent size={20} /> : null;
    }

    return (
        <div className="flex items-center mb-6">
            <span className="bg-blue-500 p-2 rounded-full text-white mr-3">
                {getIconComponent(icon)}
            </span>
            <div>
                <div className="font-bold text-gray-700 text-sm">{title}:</div>
                <a href={link} className="text-blue-500 hover:underline">{value}</a>
            </div>
        </div>
    )
}
