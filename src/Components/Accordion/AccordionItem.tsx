import {RiArrowDropDownLine} from 'react-icons/ri'
import React, {useRef} from 'react'
import './Accordion.css'

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
            className="wrapper border-black border-b overflow-hidden max-w-[550px] bg-gray-50 text-sm md:text-lg">
            <button className={`question-container ${isOpen ? 'active' : ''}`} onClick={onClick}>
                <p className='question-content font-bold'>{question}</p>
                <RiArrowDropDownLine className={`arrow ${isOpen ? 'active' : ''}`}/>
            </button>

            <div ref={contentHeight} className="answer-container" style={
                isOpen
                    ? {height: contentHeight.current?.scrollHeight}
                    : {height: "0px"}
            }>
                <p className="answer-content font-serif font-light">{answer}</p>
            </div>
        </div>
    )
}

export default AccordionItem;