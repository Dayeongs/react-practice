/* eslint-disable */    // Lint 끄는 기능
// warning은 무시해도 되지만 error는 무시하면 안된다.

import './App.css';
import { useState } from 'react';

function App() {
  
  let post = '강남 우동 맛집';

  /* state : 자료를 잠깐 저장한다.
    - 자주 변경되는 html 부분은 state로 만들어 놓는다.

    - state 만드는 법
      1. import {useState}
      2. useState(보관할 자료)
      3. let [변수명, state변경함수]

    - state 변경하는 법
      state변경함수(새로운 state)

    - state변경함수 특징
      기존state == 변경state의 경우 변경하지 않는다.

    - array/object 변수 특징
      array/object 담은 변수엔 화살표만 저장된다.
      reference data type이기 때문이다.
      '[...변수명]'으로 작성하면 화살표를 새로 바꾼다.
        1. ... : 괄호를 벗긴다.
        2. []  : 괄호를 씌운다.
        => [... ]는 괄호를 벗기고 다시 괄호를 씌운다로 해석할 수 있다.

    Q. state를 사용하는 이유?
      A. state는 갑자기 변경되면 state쓰던 html은 '자동 재렌더링' 된다.
    Q. state를 언제 사용하는지
      A. 변동시 자동으로 html에 반영되게 만들고 싶을 때 state를 사용한다.
  */
  let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']);
  let [like, setLike] = useState(0); // setLike는 state를 변경하는 함수이다.

  // return 안에는 병렬로 태그 2개 이상 사용할 수 없다.
  return (
    <div className="App">
      {/* JSX 문법(class) : className */}
      <div className="black-nav">
        {/* JSX 문법(style) : style={ {스타일명:'값'} } */}
        <h4 style={ {color : 'white', fontSize : '18px'} }>ReactBlog</h4>
      </div>
      {/* JSX 문법(변수) : 중괄호({}) 사용 */}
      {/* <h4>{ post }</h4> */}

      {/* 버튼 누르면 글제목 가나다순 정렬 기능 만들기 */}
      <button onClick={()=> {
        let copy = [...글제목];
        
        copy = copy.sort();

        글제목변경(copy);
      }}>가나다순 정렬</button>

      <button onClick={()=>{

        // array/object를 다룰 때 원본은 보존하는게 좋음
        // 글제목[0] = '여자코트 추천';

        // array/object 담은 변수엔 화살표만 저장되는데, reference data type이기 때문이다.
        // [... ]는 괄호를 벗기고 다시 괄호를 씌우는 것이며, 화살표를 새로 바꾼다.
        let copy = [...글제목];

        copy[0] = '여자코트 추천';
        글제목변경(copy);
      }}>글수정</button>

      <div className="list">
        {/* onClick={ 함수 }, 함수 작성하는 방법 : ()=>{} */}
        <h4>{ 글제목[0] } <span onClick={()=>{ setLike(like + 1) }}>👍</span> { like } </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
      
      {/* 상세페이지 모달 */}
      <Modal />

    </div>
  );
}

/* Component(컴포넌트)

  - 컴포넌트 만드는 법 [1]
    1. function을 만든다.
    2. return() 안에 html을 담는다.
      - return() 안에 html을 병렬기입하려면 전체 <div>를 감싸는 <div>를 추가할 수 있다.
      - 또는 의미없는 <div> 대신에 '<></>' 사용이 가능하다. (fragment 문법?)
    3. <함수명></함수명> 또는 <함수명/>을 쓴다.

  - 컴포넌트 만드는 법 [2]
    let 함수명 = () => {
      return (
        <div></div>
      );
    }

    * let 대신 const 변수로 선언하는 경우도 있는데, 
      const 변수로 선언하면 실수로 값을 수정하는 경우에 에러 메세지를 출력한다. (실수 방지)

    * 주의 
      - 다른 함수 밖에서 만들어야 한다.
      - 함수의 첫번째 글자는 영어 대문자로 시작한다.

  - 컴포넌트의 단점
    state를 가져다 쓸 때 문제가 생긴다.

  Q. 어떤걸 컴포넌트로 만드는지?
    1. 반복적인 html 축약할 때
    2. 큰 페이지들
    3. 자주 변경되는 것들 (UI 등)
*/
function Modal() {
  return (
    <>
      <div className='modal'>
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>  
    </>
  );
}

export default App;