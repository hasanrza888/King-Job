import { TypeAnimation } from 'react-type-animation';
function TextTypingAnimation({text}) {
    return ( 
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed once, initially
                // '',
                // 10,
                // "Azərbaycanın",
                // 10,
                // "Azərbaycanın ən",
                // 10,
                // "Azərbaycanın ən mükəmməl",
                // 10,
                // "Azərbaycanın ən mükəmməl və",
                // 10,
                // "Azərbaycanın ən mükəmməl və professional",
                // 10,
                // "Azərbaycanın ən mükəmməl və professional vakansiya",
                // 10,
                // "Azərbaycanın ən mükəmməl və professional vakansiya saytı",
                // 10,
                "Azərbaycanın ən mükəmməl vakansiya saytı",
                500,
                "Azərbaycanın ən professional vakansiya saytı",
                500,
            ]}
            speed={20}
            repeat={Infinity}
            cursor={false}
        />
     );
}

export default TextTypingAnimation;