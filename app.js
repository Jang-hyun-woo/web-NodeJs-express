const fs = require('fs');
const path = require('path');

const express = require('express');

//app상수에 express함수 저장
const app = express();

//위치를 찾아 익스프레스에 알림
app.set('views', path.join(__dirname, 'views'));
//익스트레스 앱에 대한 특정 옵션을 설정, view : 뷰파일을 처리하기위한 템플릿 엔진, 
app.set('view engine', 'ejs');

//절대경로 사용
app.use(express.static('public'));

//설정한 곳으로 전달 할 수 있게
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    //응답 객체에서 사용할 수 있는 또다른 메소드(템플릿을 렌더링)
    res.render('index');
    // const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    // res.sendFile(htmlFilePath);
});

app.get('/restaurants', function (req, res) {


    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);
    res.render('restaurants', { numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants, });
    // const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
    // res.sendFile(htmlFilePath);
});

app.get('/recommend', function (req, res) {
    // const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
    // res.sendFile(htmlFilePath);
    res.render('recommend');
});

app.post('/recommend', function (req, res) {
    //전송받은 모든 값 받기
    const restaurants = req.body;
    //데이터 편집 저장
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    //내용 읽기
    const fileData = fs.readFileSync(filePath);
    //자바스크립트 배열로 저장
    const storedRestaurants = JSON.parse(fileData);

    //새로추가된 항목들을 data.json의 배열에 추가
    storedRestaurants.push(restaurants);

    //제이슨형식으로 변경해서 전달
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

    //form에서 입력 후 버튼(POST) 클릭 시 다음 페이지로 이동
    res.redirect('/confirm');

});


app.get('/confirm', function (req, res) {
    res.render('confirm');
    // const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
    // res.sendFile(htmlFilePath);
});

app.get('/about', function (req, res) {
    res.render('about');
    // const htmlFilePath = path.join(__dirname, 'views', 'about.html');
    // res.sendFile(htmlFilePath);
});



app.listen(3000);