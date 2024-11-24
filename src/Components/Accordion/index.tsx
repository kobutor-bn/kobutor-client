import AccordionItem from "./AccordionItem.tsx";
import {useState} from "react";
import "./index.css";

type NullableNumber = number | null;

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState<NullableNumber>(null);

    const data = [
        {
            question: 'What is this platform?',
            answer: 'This platform connects users with a wide variety of products, offering secure payments and fast delivery options.',
        },
        {
            question: 'How do I reset my password?',
            answer: 'To reset your password, go to the login page, click on "Forgot Password", and follow the instructions to receive a reset link.',
        },
        {
            question: 'What are the available payment options?',
            answer: 'We accept all major credit/debit cards, PayPal, and other regional payment methods for your convenience.',
        },
        {
            question: 'How long does delivery take?',
            answer: 'Delivery typically takes 3-5 business days for standard shipping and 1-2 days for expedited shipping.',
        },
        {
            question: 'How do I track my order?',
            answer: 'Once your order ships, you’ll receive a tracking number via email. You can also find the tracking information in your account under "Orders".',
        }
    ];

    const handleItemClick = (index: number) => {
        setActiveIndex((prevIndex: NullableNumber) => (prevIndex === index ? null : index));
    };

    return (
        <div className="accordion-container my-16 bg-neutral-100 rounded-2xl shadow-lg px-6 py-10">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-indigo-600 font-montserrat">Frequently Asked Questions</h2>
                <p className="text-gray-600 text-lg mt-2 font-Nunito">
                    Got questions? Check the answers below or contact our support team.
                </p>
            </div>

            {/* Accordion Items */}
            <div className="space-y-6">
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
    );
};

export default Accordion;