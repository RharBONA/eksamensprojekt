//Pernille Java script start 

setTimeout(function(){
    const listOfQuestions = document.querySelectorAll('.faq-container');

    const faqHandler = {
        toggleAnswer(questionObject) {
            const answer = questionObject.querySelector('.answer');
            const erSynlig = answer.style.display === 'block';

            if (erSynlig) {
                answer.style.display = 'none';
                questionObject.classList.remove('active');
            }
            else{
                answer.style.display = 'block';
                questionObject.classList.add('active');
            }
        }
    };

    listOfQuestions.forEach(questionObject => {
        questionObject.addEventListener('click', () => faqHandler.toggleAnswer(questionObject));
    });
}, 1000);

//Pernille Java script end