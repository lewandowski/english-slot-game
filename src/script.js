(function () {
  const items0 = [
    'I',
    'You',
    'He',
    'She',
    'It',
    'We',
    'They'
  ];
  const items1 = [
    'add', 'allow', 'appear', 'arise', 'ask', 'awake', 'be', 'bear', 'beat', 'become', 'begin', 'believe', 'bend', 'bet', 'bid', 'bind', 'bite', 'bleed', 'blow', 'break', 'breed', 'bring', 'build', 'burn', 'burst', 'buy', 'call', 'can', 'cast', 'catch', 'change', 'choose', 'cling', 'come', 'consider', 'continue', 'cost', 'could', 'create', 'creep', 'cut', 'cut', 'deal', 'die', 'dig', 'do', 'draw', 'dream', 'drink', 'drive', 'eat', 'expect', 'fall', 'feed', 'feel', 'fight', 'find', 'fit', 'flee', 'fling', 'fly', 'fold', 'follow', 'forbid', 'forecast', 'forget', 'forgive', 'forsake', 'freeze', 'get', 'give', 'go', 'grow', 'hang', 'happen', 'have', 'hear', 'help', 'hide', 'hit', 'hold', 'hurt', 'include', 'keep', 'kill', 'kneel', 'know', 'lay', 'lead', 'lean', 'leap', 'learn', 'leave', 'lend', 'let', 'lie', 'light', 'like', 'look', 'lose', 'love', 'make', 'may', 'mean', 'meet', 'might', 'mislay', 'mistake', 'move', 'must', 'need', 'offer', 'open', 'pay', 'play', 'prove', 'provide', 'put', 'quit', 'reach', 'read', 'remain', 'remember', 'ride', 'ring', 'rise', 'run', 'say', 'see', 'seek', 'seem', 'sell', 'send', 'serve', 'set', 'shake', 'shed', 'shine', 'shoot', 'should', 'show', 'shrink', 'shut', 'sing', 'sink', 'sit', 'sleep', 'slide', 'slit', 'smell', 'sneak', 'speak', 'speed', 'spell', 'spend', 'spill', 'spin', 'spit', 'split', 'spoil', 'spread', 'spring', 'stand', 'start', 'stay', 'steal', 'stick', 'sting', 'stink', 'stop', 'strike', 'string', 'strive', 'swear', 'sweep', 'swell', 'swim', 'swing', 'take', 'take', 'talk', 'teach', 'tear', 'tell', 'think', 'throw', 'thrust', 'try', 'turn', 'understand', 'undertake', 'upset', 'use', 'wait', 'wake', 'walk', 'want', 'watch', 'wear', 'weave', 'weep', 'will', 'win', 'wind', 'withdraw', 'work', 'would', 'write'
  ];
  const items2 = [
    'Simple Present',
    'Simple Past',
    'Present Continuous',
    // 'Present Perfect',
    'Future (will)',
    'Future (going to)',
    // 'Future Perfect',
    'Past Continuous'
    // 'Past Perfect',
    // 'Future Continuous',
    // 'Pres. Perf. Cont.',
    // 'Past Perf. Cont.',
    // 'Future Perf. Cont.'
  ];
  const items3 = [
    'Affirmative',
    'Negative',
    'Question'
  ];
  const items4 = [
    '5',
    '15',
    '25',
    '50',
    '75',
    '100'
  ];

  const items_arr = { items0: items0, items1: items1, items2: items2, items3: items3, items4: items4 };

  const door1 = document.querySelectorAll('.door1')[0];
  const door2 = document.querySelectorAll('.door2')[0];
  const door3 = document.querySelectorAll('.door3')[0];
  const door4 = document.querySelectorAll('.door4')[0];
  const door5 = document.querySelectorAll('.door5')[0];

  //const doors = document.querySelectorAll('.door');

  const doors = [door1, door2, door3, door4, door5];
  
  document.querySelector('#spinner').addEventListener('click', spin);
  document.querySelector('#reseter').addEventListener('click', init);
  document.querySelector('#reverso').addEventListener('click', go_reverso);

  function init(firstInit = true, groups = 1, duration = 1) {
    let i = -1;
    for (const door of doors) {

      i++;

      // if (firstInit) {
      //   door.dataset.spinned = '0';
      // } else if (door.dataset.spinned === '1') {
      //   return;
      // }

      const boxes = door.querySelector('.boxes');
      const boxesClone = boxes.cloneNode(false);
      const pool = ['❓'];

      if (!firstInit) {
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          var items = items_arr["items"+i.toString()];
          arr.push(...items);
        }
        pool.push(...shuffle(arr));

        boxesClone.addEventListener(
          'transitionstart',
          function () {
            door.dataset.spinned = '1';
            this.querySelectorAll('.box').forEach((box) => {
              box.style.filter = 'blur(1px)';
            });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          'transitionend',
          function () {
            this.querySelectorAll('.box').forEach((box, index) => {
              box.style.filter = 'blur(0)';
              if (index > 0) this.removeChild(box);
            });
          },
          { once: true }
        );
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = door.clientWidth + 'px';
        box.style.height = door.clientHeight + 'px';
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
      door.replaceChild(boxesClone, boxes);
    }
  }

  async function spin() {
    init(false, 1, 2);

    var audio = new Audio('../assets/slot.wav');
    audio.play();
    
    for (const door of doors) {
      const boxes = door.querySelector('.boxes');
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = 'translateY(0)';
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
  }

  async function go_reverso() {
    let app = document.getElementById("app");
    let current_verb = app.querySelector(".doors .door2 .boxes .box").innerHTML;

    if (current_verb && current_verb != '❓') {
      let url = `https://conjugator.reverso.net/conjugation-english-verb-${current_verb}.html`;
      window.open(url, '_blank');
    }
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  init();
})();