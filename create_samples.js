const fs = require('fs');
const path = require('path');

const authors = ['김철수', '이영희', '박지민', '최민수', '정대연', '강수진', '윤도현', '한미나', '조성우', '임지연', '장동건', '고소영', '홍길동', '성춘향', '이몽룡'];
const titles = [
    '음질 최고예요', '가성비 갑', '디자인이 예뻐요', '노이즈 캔슬링 대박', '조금 비싸지만 만족',
    '배터리가 아쉬워요', '운동할 때 딱임', '연결이 가끔 끊겨요', '착용감이 너무 좋아요', '추천합니다',
    '선물용으로 샀는데 좋아하네요', '통화 품질이 좋아요', '색상이 실물이 더 이쁨', '박스가 찌그러져 왔어요', '배송 빨라요'
];
const contents = [
    '베이스가 웅장하고 고음도 깨끗해요. 음악 듣는 맛이 나네요.',
    '이 가격에 노이즈 캔슬링이 이 정도라니 놀랍습니다.',
    '장시간 착용해도 귀가 전혀 아프지 않아서 좋아요.',
    '헬스장에서 운동할 때 쓰는데 땀 흘려도 괜찮고 잘 안 빠져요.',
    '지하철에서 노캔 켜면 정말 조용해집니다. 신기해요.',
    '배터리는 하루 종일 쓰기엔 조금 모자란 느낌이에요.',
    '블루투스 페어링 속도가 정말 빨라서 편합니다.',
    '통화할 때 제 목소리가 상대방에게 잘 전달된다고 하네요.',
    '디자인이 세련되어서 어디에나 잘 어울려요.',
    '충전 케이스가 작아서 주머니에 넣고 다니기 좋습니다.',
    '노이즈 캔슬링은 좋은데 주변 소음 듣기 모드는 약간 이질감이 있어요.',
    '귀에 쏙 들어가서 격렬한 운동을 해도 빠질 걱정이 없네요.',
    '음질은 정말 하이엔드급입니다. 만족스러워요.',
    '터치 조작이 생각보다 민감해서 가끔 오작동할 때가 있네요.',
    '전반적으로 아주 훌륭한 제품입니다. 재구매 의사 있어요.'
];

const samples = [];
for (let i = 1; i <= 100; i++) {
    const rating = Math.floor(Math.random() * 3) + 3; // 3~5 star
    const author = authors[i % authors.length];
    const title = titles[i % titles.length];
    const content = contents[i % contents.length];
    const date = `2025-02-${String(Math.floor(Math.random() * 25) + 1).padStart(2, '0')}`;
    const helpful = Math.floor(Math.random() * 50);
    const verified = Math.random() > 0.2;

    samples.push(`${i},${rating},"${title}","${content}",${author},${date},${helpful},${verified}`);
}

const header = 'id,rating,title,content,author,date,helpful_votes,verified_purchase';
const csvContent = [header, ...samples].join('\n');

const samplesDir = path.join(__dirname, 'samples');
if (!fs.existsSync(samplesDir)) {
    fs.mkdirSync(samplesDir);
}

fs.writeFileSync(path.join(samplesDir, 'review.csv'), csvContent);
console.log('Successfully generated 100 reviews in samples/review.csv');
