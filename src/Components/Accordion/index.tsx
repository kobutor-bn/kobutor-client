import AccordionItem from "./AccordionItem.tsx";
import {useState} from "react";
import './index.css'

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
        <div
            className='2xl:max-w-screen-2xl max-w-screen-xl w-full m-auto shadow-lg bg-gray-100 py-20 my-32 2xl:my-64 px-6 flex flex-col gap-16 md:px-32 md:p-10 md:pb-28 lg:rounded-3xl'>
            <p className="flex flex-col gap-3 2xl:gap-8 md:px-20 md:pb-0 2xl:py-20 md:py-10 text-center">
                <span
                    className="text-2xl md:text-5xl 2xl:text-8xl font-extrabold">Questions? We've got answers.</span><br/>
                <span className="text-sm lg:text-xl xl:text-3xl 2xl:text-5xl">Not seeing your specific question, check our help center or contact our support team.</span>
            </p>
            <div className="wrapperp rounded-3xl bg-gray-50 px-3 py-6 md:px-10 md:py-10">
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
            <p className="text-center 2xl:text-3xl">
                Our customer support is available Monday to Friday: 5am-5pm BD Time.
                <br/>Average answer time: less than 2 hours
            </p>
        </div>
    )
};

export default Accordion;