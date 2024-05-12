import AccordionItem from "./AccordionItem.tsx";
import {useState} from "react";
import './Accordion.css'

type NullableNumber = number | null;

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState<NullableNumber>(null);

    const data = [
        {
            question: 'What are accordion components?',
            answer: 'Accordion components are user interface elements used for organizing and presenting content in a collapsible manner. They typically consist of a header, content, and an expand/collapse action.',
        },
        {
            question: 'What are they used for?',
            answer: 'They are commonly employed in various contexts, including FAQs, product descriptions, navigation menus, settings panels, and data tables, to save screen space and provide a structured and user-friendly interface for presenting information or options.',
        },
        {
            question: 'Accordion as a musical instrument',
            answer: 'The accordion is a musical instrument with a keyboard and bellows. It produces sound by air passing over reeds when the player expands or compresses the bellows, used in various music genres.',
        },
        {
            question: 'Can I create an accordion component with a different framework?',
            answer: 'Yes of course, it is very possible to create an accordion component with another framework.',
        }
    ];

    const handleItemClick = (index: number) => {
        setActiveIndex((prevIndex: NullableNumber) => (prevIndex === index ? null : index));
    };

    return (
        <div className='max-w-screen-md w-full m-auto shadow-lg bg-gray-100 py-20 my-32 px-6 md:p-10 md:rounded-3xl'>
            <p className="flex flex-col gap-3 mb-10 md:mb-5 md:pb-0 md:px-20 md:py-10 text-center">
                <span className="text-2xl md:text-5xl font-extrabold">Questions? We've got answers.</span><br/>
                <span className="text-sm">Not seeing your specific question, check our help center or contact our support team.</span>
            </p>
            <div className="wrapperp bg-gray-50 p-6 md:px-20 md:py-10">
                {data.map((item, index) => (
                    <AccordionItem
                        key={index}
                        question={item.question}
                        answer={item.answer}
                        isOpen={activeIndex === index}
                        onClick={() => handleItemClick(index)}
                    />
                ))}
            </div>
        </div>
    )
};

export default Accordion;