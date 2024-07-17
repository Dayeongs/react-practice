import React, { useState } from "react";

const Input2 = () => {
    
    const [inputs, setInputs] = useState({ 
        name: "",
        email: "",
        tel: ""
     });

    // object 분해기법을 이용해서 값을 빼낸다.
    const {name, email, tel} = inputs;

    const onChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        // heap 메모리의 블록에 실제 배열이나 객체에 대한 참조값만 가지고 있다. 
        // 리액트에서는 변경된 것을 인지할 수 있도록 아래와 같은 방법을 사용한다. - 상태관리
        setInputs({
            // inputs을 분해해서 새로운 오브젝트를 만든다.
            // ...inputs 에는 { name: "", email: "", tel: ""} 값이 들어있다.
            ...inputs,
            [id]: value
        })
    }

    return (
        <div>
            <div>
                <label>이름</label>
                <input type="text" id="name" value={ name } onChange={ onChange } />
            </div>
            <div>
                <label>이메일</label>
                <input type="email" id="email" value={ email } onChange={ onChange } />
            </div>
            <div>
                <label>전화번호</label>
                <input type="tel" id="tel" value={ tel } onChange={ onChange } />
            </div>
            <p>이름: {name}</p>
            <p>이메일: {email}</p>
            <p>전화번호: {tel}</p>
        </div>
    );
}

export default Input2;