//هنا بتعمل سليكتور على جميع العناصر اللى فى الاتش تي ام ال علشان تستخدمه 

//هنا بقوله اعمليس سليكتور على العنصر ده اللى هو شايل رقم الاساله كام سوال 
let countspan = document.querySelector(".quiz-info .count span");

//هنا ده العنصر الديف اللي شايل جميع الاسبان اللى جوه 
let bulletsSpanContainer = document.querySelector(".bulelts .spans");
let bullets = document.querySelector(".bulelts ");

//ده متغير بيقتنص المكان اللى بيشيل السوال كا اب للعنصر اللى هو السوال 
let quizArea  = document.querySelector(".quiz-app .quiz-area");
//هنا ده سليكتور على الديف اللي بيشيل جميع الاختيارت 
let answersArea = document.querySelector(".quiz-app .answers-area")
//ده سليكتور على الزرار اللى لما المستخدم هيختار الاجابه هيدوس عليه 
let submitButton = document.querySelector(".quiz-app .submit-button");

//ده سليكتور بيقتنص العنصر الاب اللي هيحتوي على النتيجه 
let results =  document.querySelector(".results");

let countdownElement =  document.querySelector(".countdown");
//ده متغير بيبداء من صفر هضيفه كا رقم الاندكس اللى فى الاريه اللى شايله جميع الابجيكت 
let currentIndex = 0 ;
//ده متغير يحتوي على عدد الاجابة الصحيح اللى اسمتخدم جوبه 
let rightAnswers = 0;

let conutDownInterval;
//هنا بتعمل فنيكشن علشان جوه هتعمل اتصال بي ملف الجيسون اللى فيه البينات
function getQuestions(){

    //هنا بتعمل متغير يشيل الابجيكت اللى بيعمل اتصال بالملف الجيسون اللى فيه البينات 
    let myRequest = new XMLHttpRequest();

    //ده ميسود موجوده جوه الابيكت بتقوله لما الاستات يحصل فيه اي تغير نفيذ الفنكيشن دي 
    myRequest.onreadystatechange = function(){
        //هنا بقوله ايف كونديش لما الريدي استات تكون بتساوي اربع يعنى الاتصال تم ونجح
        //وكمان لما تتاكيد ان الاستاتيوس رجعلك بالبينات ونجح فى جلب البينات 
        if(myRequest.readyState === 4 && this.status === 200 ){
           
            //سعتها اعملي متغير بيساوي تحولي الابجيكت التيكست الى جافا اسكريبت ابجيكت 
            let questionsObject = JSON.parse(this.responseText);
            shuffle(questionsObject)
           
            //واعرضهولي فى الكونسول علشان هشوف هتعامل معه ازاى 
           // console.log(questionsObject);
            //هنا عمل متغير يشيل عدد الابجيكت اللى جوه الاريه اللى هتجي من ملف الجيسون  
           let qCount = questionsObject.length; 
            //هنا بعمل اتشكيك بالكونسول علشان اتاكيد انه هو رقم زي مانا عوز 
            //console.log(questionsCount);

            //هنا دي النفكيشن اللى بتنشاء بولتس بعدد الاساله  
            cearetBullets(qCount);
            

            //دلوقتي هنا هشغل الفنيكشن  علشان اجيب الابجيكت اللى هتعامل معه اللى هو فى السوال والاجابه 
            //اول برميطر هيكون هو الابجيكت اللى هتعامل معاه 
            //ثاني برميطر هو عدد الابجيكتات اللى جوه الجيسون ابجيكت ده كام واحد 
            addQuestionData(questionsObject[currentIndex] ,qCount );
            
            
            //start countdown هتشتفل اول مره هنا علشان اول سوال 
            conutDown(186,qCount );
               
            //Click  on submit 
            submitButton.onclick = () => {
                    
                
                //هنا بقوله اعمل متغير هشيل جوه الاجابه الصحيح 
                let theRightAnswer = questionsObject[currentIndex].right_answer;
                //وبعد كده زودلي واحد فى الكرينت اندكس علشان يروح للابجيت الثاني داخل الاريه 
                //اللى بتحتوي على جميع الابجيكتات 
                

                    //هنا الاتشيك اللى بتفصح الاجابات بتقبل اتنين برميطر 
                //الاول هو الاجابه الصحيح من رقم الابجيكت اللى فى الكرنت اندكيس 
                //والثاني عدد جميع الابجيكات 
                checkAnswer(theRightAnswer , qCount);
                setTimeout(() => {
                    currentIndex ++;
            

                  
                
                //هنا بقا هحذف السوال والاجابه القديمه والاختيارات 
                quizArea.innerHTML = '';
                answersArea.innerHTML = ""; 

                //هنا دي النفيكشن اللى بضيف السوال والاجابه من الابجيكت بناءاء على الكرنت انكس 
                //بيساوي رقم كام يعنى بيساوي انهي ابجيكت اللى هجيب من السوال والاجابه 
                addQuestionData(questionsObject[currentIndex] ,qCount );
                //هنا دي الفنيكن اللى بتضيف كلاس اون على البولتس 
                handleBullets();

                //هنا بقا جوه الكلك بعمل ايقف للعدات علشان يبداء يعد من جديد 
                clearInterval(conutDownInterval);
                //هنا بقا بشغل النفكيشن علشان تبداء العددد من جديد
                //لما المستخدم يكون اختار اجابه قبل عدد الثواني ميخلص 
                conutDown(186,qCount);

                showResults(qCount);
                answersArea.classList.remove("no-click");
                submitButton.classList.remove("lol");
             }, 3000);

                // دي ايف كونديشن علشان امنع الكرنت اندكس من انه يعدي عدد عناصر الابجيكت 
                //بقوله لو الكرينت اندكيس بيساوي الكوينت 
                //سعتها نقصلي من الكرنت اندكس واحد 
                //يبقا كل ما يساوي ينقص واحد تودوس تاني علشان يزيد يروح منقه 
                // يبقا كانك وقت الكرينت اندكس من انه يزيد واحد 
                if(currentIndex === qCount ){
                    currentIndex --;
                }
            }
        
            

        }
    }
    //الاول هنا بتقوله هستخدم الميسو اللي اسمه جيت وبعد كده بتقوله المسارة سواء كان على جهازك او 
    //فى رابط اتش تي تي بي وبعد كده بتقوله تروي يعنى انتظر استدعاء الابجيكت وبعد كده كمل 
    myRequest.open("GET","https://raw.githubusercontent.com/ahmedsalem4/Questions/main/html_question.json",true);
    //بعد كده بتقوله سيند يعنى ابعت الطلب ده للملف اللي موجود على جهازك او للابي اي 
    myRequest.send();
}


 
//هنا بشغل الفنيكشن 
getQuestions();

//هنا بقوله النفيكشن دي بتقبل برمطير بسمي باي اسم ولكن اسم معبر هو نم يعنى رقم 
function cearetBullets(num){

    //هنا بجيب العنصر اللى هو بيقولك هم كام سوال كله وبخلي يخود الرقم اللى جي من البرميطر 
    countspan.textContent = num;

    //هنا بعمل فور لوب علشان انشاء اسبان بنفس عدد الاساله 
    for(let i = 0 ; i < num ; i++){
        //هنا فى كل لفه هينشاء اسبان 
        let span = document.createElement("span");
        //هنا بقوله ايف كونديشن لو الاي ده رقمه صفر يعنى فى اول لفه 
        if( i === 0){
            //ضفلي على الاسبان كلاس اون علشان اول ما الابكيشن يبدء هيكون فى اول سوال 
            span.className = "on"
        }
        //وفى كل لفه هضيف الاسبان ده جوه العنصر اللى يحتوي على الاسبان 
        bulletsSpanContainer.appendChild(span);


    } 
}

// هنا الفنيكشن دي بتجبلك الابجيكت اللى هتتعامل ماعه فى الربميطر الاول 
//وفى البرمطير الثاني فى عدد الابجيكتات اللى جوه الجيسون ابجيكت ده كام ابكيجت
function addQuestionData(obj , count){
    //هنا بقوله لو الكرينت اندكس اللى هو صفر اصغر من الكوينت اللى هو اربعه يبقا نفيذ الكود
    //لحد مهيجي فى الاخر هيلاقي الكرينت اندكس بيساوي الكوينت يبقا الشرط مش هيتم تنفيذه 
    //سعتها هيتم حذف السوال والاجابه ولكن الكرينت اندكس مذال بيتم زيادته 
    
    if(currentIndex < count ){
        
        //هنا بنشاء عنصر اتش تو 
        let questionTitle = document.createElement("h2");
        //هنا بقوله خود التيكست بتعتك من الابجيكت هتلقي فى تيتل الفالو بتعته هي السوال 
        let questionText = document.createTextNode(obj.title);
        //بعد كده هان بضيف التيكست جوه الاتش تو كده اصحب الاتش تو فيى السوال 
        questionTitle.appendChild(questionText);
        // بعد كده بتنقص الديف اللى فيه بيتم وضع السوال وبقوله ضيف السوال هو 
        quizArea.appendChild(questionTitle);
        
        //بعد كده بعمل فور وبتبداء من رقم واحد علشان الابجيكت جوه السوال بيبداء من رقم واحد لحد اربعه
        //وهنا بقوله الفور لوب دي هتلف بعدد الاساله اللى هم اربعه  
        
        
          //الشفيل لازم يحصل هنا    
        
        for(let i = 1 ; i <= 4 ; i++){
            
      
            // هنا بقا بتقوله كريتلي ديف 
            let mainDiv = document.createElement("div");
            //اديلو كلاس 
            mainDiv.className = "answer";
            mainDiv.classList.add(`or-${i}`) ;
            //وكمان انشالي انبوت 
            let redioInput = document.createElement("input");
            //وادي للانبوت ده نيم 
            redioInput.name = "question";
            //وكمان اديلو طيب بيساوي نوع الطيب راديو 
            redioInput.type = "radio";
            //واديلو ايدي هيكون اسمو اسنير اندر اسكول بعدد الفور لوب 
            redioInput.id = `answer_${i}`;
            //وكمان خلي الداتا سيت بتعت الانبوت ده بتساوي اختيارات الاجبات اللى فى الاجبكيت 
            redioInput.dataset.answer = obj[`answer_${i}`];
            //هنا بقوله ايف كونديشن لو الاي بتعت الفور لوب بتساوي واحد يبقا ده اول عنصر بنشاء 
            //ضفلي عليه اتربيوت اتشيكد بيساوي تروي يعنى اعمله اتشيكد كانه مختاره 
                if( i === 1){
                    //redioInput.checked = true;
                }
                //بعد كده بنشاء الليبو 
            let theLabel = document.createElement("label");
            //هنا بقوله الفور بتعت الليبول هتجبه من الانسر وبردو بعدد لفات اللوب 
            theLabel.htmlFor = `answer_${i}`;
            //هنا بقا بنشاء التيكست بتع الليبول اللى هو الاختيار بتع السوال 
            //بقوله هتو من الابجيكن من الكي اللى اسمو انسر وبتديلو الانسر اندرسول واحد وتانين وثلاث
            let theLabelText = document.createTextNode(obj[`answer_${i}`]);
                //بعد كيده بضف التيكست لليبول 
            theLabel.appendChild(theLabelText);
                //وبعد كده بضيف الانبوت داخل الديف 
            mainDiv.appendChild(redioInput);
            //وبعد كده بضيف بردو الليلول جوه الديف 
            mainDiv.appendChild(theLabel);
            
                //بعد كده بخود الديف نفسه واضيفه للكوينتنر اللى بيشيل جميع الاختيارت 
            answersArea.appendChild(mainDiv);
        }
        
        let blocks = Array.from(answersArea.children);
        let orderRange = Array.from(Array(blocks.length).keys());
        shuffle(orderRange);
        blocks.forEach((block,index) => {
            block.style.order = orderRange[index]; 
        })
        //console.log(orderRange);
        
    }
}



//دي فنيكشن بتيجي فيه الاجابه الصحيحه من الابجيكت 
//وكمان بيجي فيه عدد الابجيكتات بتع الجيوسن ابجيكت 
function checkAnswer(rAnswer,count){

    //هنا بعمل متغير بقوله هتلي جميع العناصر اللى فيهم عنصر نيم اسمو كويشن 
    //هيجيبلي جميع الرديو بوتون داخل نود ليست تقدر تقول اريه 
    let answers = document.getElementsByName("question");
    //وبعمل متغير فاضي  وده همله من داخل اللوب بالاجابه اللى المستخدم هيختاره 
    let theChoosenAnswer ;

    //هنا بقوله اعمل لوب بعدد عناصر النبوت ريديو اللى هما اربعه 
    for( let i = 0 ;i < answers.length; i++){
        
        //هنا بقوله ايف كونديشن هتلي منهم فقط اللي يحتوي على اتربيوت اتشيكد
        //الايف كونديشن ده هيضاف عليهم كلهم لما المستخدم هيختار هيجي واحد فقط تروي والباقي فوليس
        if(answers[i].checked){
            //التروي ده اللى المستخدم اختاره هقوله
            //هقوله المتغير الفاضي اللى فوق ده خلي بيساوي الداتا سيت بتعت العنصر اللى تم اختياره 
            //الداتا سيت بتعته بتحتوي على الاجابه 
            theChoosenAnswer = answers[i].dataset.answer;
        
            

        }
        
        if(answers[i].dataset.answer === rAnswer){
            answers[i].parentElement.classList.add("bom");
            
            submitButton.classList.add("lol");
             answersArea.classList.add("no-click");
        }

    }
       
    //هنا بقا بقارن لو الاجابه الصحيح بتساوي الاجابه اللى المستخدم اختاره 
    if(rAnswer === theChoosenAnswer ){
        //سعته زودلي الاسكور بتعه واحد لانه حل السوال 
        //علشان كمان احسب عدد الاساله اللى جوبه المستخدم وقوله انت جبت كام من كام 
        rightAnswers ++;
        

    }
}


//الفنيكشن دي مش بتقبل برميطر لا دي بتنفيذ هدف معين بناء لعى الكرنت اندكس وهي الهدف بتعه
//انه تضيف كلاس اون على البوليست اللى المستخدم عده بيه عن طريق انتقاله الى السوال التالي

function handleBullets(){
//هنا بعمل متغير شيل قيمة السليكتور السليكتور هيكون على الاسبان اللى هي البولتس 
//هيجيو جوه نود ليست 
    let bulletsSpans = document.querySelectorAll(".bulelts .spans span");
    //هعمل متغير تاني بيحتوي على اريه من النود ليست 
    let arrayOfSpans = Array.from(bulletsSpans);
    //بعد كده هعمل فور يش على الاريه دي وقوله هتلي اسبان اسبان والاندكيس اندكس 
    arrayOfSpans.forEach((span , index) => {

        //هنا بقا جوه هعمل ايف كونديشن لو الكرينت اندكيس بيساوي الاندكس بتع البولتس 
        if(currentIndex === index){
            //يبقا ضفلي كلاس اسمو اون على البوليست دي 
            span.className= "on";

        }
    })
}

function showResults(count){

    let theResults ;
    //هنا بعمل ايف كونديش بقوله لو الكرينت اندكس وصل انه بقا بيساوي العدد بتع عناصر الاريه بتعت الابجيكتات 
    if(currentIndex === count){
        quizArea.remove();
        bulletsSpanContainer.remove();
        answersArea.remove();
        submitButton.remove();
        bullets.remove();

        if(rightAnswers > (count / 2) && rightAnswers < count    ){
            theResults = `<span class="god">good</span> ${rightAnswers} From ${count} Is Good`;
        } else if(rightAnswers === count ){
            theResults = `<span class="prefact">prefact</span> ${rightAnswers} From ${count} Is very Good`;
        }else{
            theResults = `<span class="bad">bad</span> ${rightAnswers} From ${count} Is very bad`;
        }
        results.innerHTML =theResults; 
    }


}


function conutDown(duration, count ) {
    if(currentIndex < count ){
        let minutes ;
        let seconds ;
        conutDownInterval = setInterval(function(){
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
            

            minutes = minutes < 10 ? `0 ${minutes}`:minutes ;
            seconds = seconds < 10 ? `0 ${seconds}`:seconds ;
            countdownElement.innerHTML = `${minutes} : ${seconds}`;
            
            duration--;
            if(duration < 0){
                 
               
               // console.log("time is finished");
                //هنا كل ما العدد بتع الثواني يخلص هدوس انا علشان زرار البوتون علشان 
                //يروح للسوال اللى بعدو كمان يبداء الوقت من جديد 
                clearInterval(conutDownInterval);
                submitButton.click();
                //console.log(currentIndex);
                //console.log(count);

                
            }
            
        },1000) ;
    }
}

/*
let orderRange = [...Array(blocks.length).keys()];
console.log(orderRange);
*/

/*
//بعد كده شغلي عليهم الفنيكشن بتعت الشفيل دي علشان يلغبط العناصر 
shuffle(orderRange);
 
//هنا انا بقوله هتلي الاريه اللى فيه جميع البلوكات هتلي الاندكس وهتلي العنصر 
blocks.forEach( function(block , index) {
//هنا بقوله العنصر هضيف عليه خصيت السي اس اس اللى هي الاوردر دي بطتلب رقم 
//بقوله الرقم خوده من الاريه اللى اسمه رينج الاريه اللى اسمه رينج دي ارقام 
//بقوله وزع العناصر كله بقا من الارقام دي من صفر لحد عشرين متلفبيتين
    block.style.order = orderRange[index]; 
})
*/

//الفنكيشن دي بتطلب اريه 
function shuffle(array){
    //هنا بنعمل متغير بيشل عدد عناصر الاريه علي ثبيل المثال عشره
    let current = array.length;
    //هنا بنعمل متغير كا صندوق علشان نضيف فيه رقم 
    let temp ; 
    //وهنا بنعمل متغير بيجيب رقم عشوائي 
    let random ;
    
    
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
  
        array[current] = array[random];
      
        array[random] = temp;
     
    }

    return array;
    
   
}