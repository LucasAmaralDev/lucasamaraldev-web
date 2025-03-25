import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PortfolioItemProps {
  nome: string;
  descricao: string;
  imagens: string[];
  stacks: string[];
}

export default function CardPortfolio({ nome, descricao, imagens, stacks }: PortfolioItemProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  return (
    <div className="mb-12 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Carrossel de imagens */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <div className="relative overflow-hidden rounded-lg shadow-md bg-gray-100 h-64 md:h-80">
            {imagens.length > 0 ? (
              <>
                <img
                  src={imagens[currentImageIndex]}
                  alt={`${nome} - Imagem ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {imagens.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <FaChevronLeft />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                  {imagens.map((_, index) => (
                    <span 
                      key={index} 
                      className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sem imagens disponíveis
              </div>
            )}
          </div>
        </div>

        {/* Detalhes do projeto */}
        <div className="md:w-1/2">
          <h3 className="text-xl font-bold text-blue-600 mb-3">{nome}</h3>
          <p className="text-gray-700 mb-4">{descricao}</p>
          
          <div className="mb-4">
            <h4 className="text-gray-800 font-medium mb-2">Tecnologias utilizadas:</h4>
            <div className="flex flex-wrap gap-2">
              {stacks.map((stack, index) => (
                <span 
                  key={index} 
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 