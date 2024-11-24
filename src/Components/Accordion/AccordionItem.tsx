import React from "react";
import {FiMinus, FiPlus} from "react-icons/fi"; // Icons for expand/collapse

interface AccordionItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({question, answer, isOpen, onClick}) => {
    return (
        <div
            className={`transition-all border rounded-xl shadow-md ${
                isOpen ? "bg-indigo-50 border-indigo-500" : "bg-white border-gray-300"
            }`}
        >
            {/* Question Header */}
            <div
                onClick={onClick}
                className="flex justify-between items-center cursor-pointer p-5 font-montserrat"
            >
                <h3 className="text-lg font-medium text-gray-800">{question}</h3>
                {isOpen ? (
                    <FiMinus className="text-indigo-500 w-6 h-6"/>
                ) : (
                    <FiPlus className="text-gray-500 w-6 h-6"/>
                )}
            </div>

            {/* Answer Content */}
            {isOpen && (
                <div className="px-5 pb-5 text-gray-600 text-sm font-Nunito">
                    {answer}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;