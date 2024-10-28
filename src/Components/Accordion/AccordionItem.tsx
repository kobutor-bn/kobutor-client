import {RiArrowDropDownLine} from 'react-icons/ri'
import React, {useRef} from 'react'
import './index.css'

interface AccordionItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick?: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = (props) => {
    const {question, answer, isOpen, onClick} = props;
    const contentHeight = useRef<HTMLDivElement | null>(null);

    return (
        <div
            className="wrapper border-black border-b overflow-hidden max-w-screen-md bg-gray-50 text-sm md:text-lg">
            <button className={`question-container ${isOpen ? 'active' : ''}`} onClick={onClick}>
                <p className='font-Nunito question-content font-semibold 2xl:text-4xl'>{question}</p>
                <RiArrowDropDownLine className={`arrow ${isOpen ? 'active' : ''}`}/>
            </button>

            <div ref={contentHeight} className="answer-container" style={
                isOpen
                    ? {height: contentHeight.current?.scrollHeight}
                    : {height: "0px"}
            }>
                <p className="font-Nunito font-light answer-content text-xl 2xl:text-4xl">{answer}</p>
            </div>
        </div>
    )
}

export default AccordionItem;