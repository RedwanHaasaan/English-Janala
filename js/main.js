// constants
const lessonBtnContainer = document.getElementById("lessonBtnContainer");
const wordsContainer = document.getElementById("wordsContainer");

//Load all Lessons Buttons
const loadLessonBtns = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayBtns(json.data));
};

//Display all Lessons Buttons
const displayBtns = (btnList) => {
  lessonBtnContainer.innerHTML = "";
  for (let btn of btnList) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button onclick="loadLevelWord(${btn.level_no})" class="btn btn-outline btn-primary gap-1 group">
                <i class="fa-solid fa-book-open text-primary group-hover:text-white"></i>
                <span>Lesson-${btn.level_no}</span>
            </button>
        `;
    lessonBtnContainer.appendChild(btnDiv);
  }
};
//Display all Lessons Buttons
const loadLevelWord = (level_id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${level_id}`)
    .then((res) => res.json())
    .then((json) => displayWords(json.data));
};
//ShowDefault Message
const showDefaultMessage = () => {
  wordsContainer.innerHTML = `
    <div class="col-span-full flex flex-col justify-center items-center text-center max-w-md mx-auto gap-4">
        <img src="./assets/alert-error.png" alt="Alert Error" class="w-24">

        <p class="text-gray-500">
            আপনি এখনো কোন Lesson Select করেন নি
        </p>

        <h1 class="text-2xl font-semibold">
            একটি Lesson Select করুন।
        </h1>
    </div>
  `;
};
//displayWords
const displayWords = (wordList) => {
  console.log();
  wordsContainer.innerHTML = "";
  if (wordList.length > 0) {
    for (let word of wordList) {
      const wordDiv = document.createElement("div");
      wordDiv.innerHTML = `
                    <div class="bg-white rounded-xl text-center flex flex-col gap-6 sm:gap-8 p-6 sm:p-10 lg:p-14 w-full max-w-md mx-auto">
                        <div class="flex flex-col gap-4 sm:gap-6">
                            <h2 class="text-2xl sm:text-3xl font-bold text-gray-950">${word.word}</h2>
                            <h4 class="text-lg sm:text-xl font-medium text-gray-900"> Meaning / Pronunciation </h4>
                            <p class="font-hind text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-500"> "${word.meaning} / ${word.pronunciation}" </p>
                        </div>
                        <div class="flex justify-between items-center">
                            <!-- Info -->
                            <button onclick="fetchWordDetails(${word.id})" class="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-sky-200 transition">
                                <i class="fa-solid fa-circle-info text-slate-600 text-sm sm:text-base"></i>
                            </button>
                            <!-- Volume -->
                            <button onclick="pronounceWord('${word.word}','${word.id}')" class="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-sky-200 transition">
                                <i id="volumeBtn-${word.id}" class="fa-solid fa-volume-high text-slate-600 text-sm sm:text-base"></i>
                            </button>
                        </div>
                    </div>
            `;
      wordsContainer.appendChild(wordDiv);
    }
  } else {
    const wordDiv = document.createElement("div");
    wordDiv.classList =
      "col-span-full flex flex-col justify-center items-center text-center max-w-md mx-auto gap-4";
    wordDiv.innerHTML = `
                    <img src="./assets/alert-error.png" alt="Alert Error">
                    <p class="text-gray-600"> এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
                    <h1 class="text-2xl font-semibold">নেক্সট Lesson এ যান </h1>
            `;
    wordsContainer.appendChild(wordDiv);
  }
};

//Speaker Button Clicks
const pronounceWord = (word, id) => {
window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(word);
  speech.lang = "en-US";
  speech.rate = 0.7;
  speech.pitch = 1;
  const volumeBtn = document.getElementById(`volumeBtn-${id}`);
  volumeBtn.classList.add("animate-pulse");
  speech.onend = () => {
    volumeBtn.classList.remove("animate-pulse");
  };
  window.speechSynthesis.speak(speech);
};

//show info word
const fetchWordDetails = (wordId) => {
  fetch(`https://openapi.programming-hero.com/api/word/${wordId}`)
    .then((res) => res.json())
    .then((json) => displayWordsDetails(json.data));
};

const displayWordsDetails = (data) => {
    const wordName=document.getElementById("info_word");
    const wordPronounce=document.getElementById("word_pornounce");
    const wordMeaning=document.getElementById("word_meaning");
    const wordPartsOfSpeech=document.getElementById("word_partsOfSpeech");
    const wordSentence=document.getElementById("word_sentence");
    const wordSynonymsContainer=document.getElementById("word_synonyms");
    const AllSynonyms=data.synonyms;
    wordName.innerText=data.word;
    wordPronounce.innerHTML=`(<i class="fa-solid fa-microphone-lines"></i>:${data.pronunciation})`;
    wordMeaning.innerText=data.meaning;
    wordPartsOfSpeech.innerText=data.partsOfSpeech;
    wordSentence.innerText=data.sentence;
    wordSynonymsContainer.innerHTML="";
    for(let synonym of AllSynonyms){
        const element=document.createElement("span");
        element.classList="px-4 py-2 bg-slate-100 rounded-lg";
        element.innerHTML=`${synonym}`
        wordSynonymsContainer.appendChild(element);
    }
    document.getElementById("word_info").showModal();
}
loadLessonBtns();
showDefaultMessage();
