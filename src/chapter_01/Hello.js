import React from "react"

function Hello(props) {
    return (
        <div style={{color: props.color}}>
            {/* 단순히 조건이 t/f에 따라 보여주고 숨겨주는 기능이라면 && 연산자가 더 간편함
                   isSpecial: false -> false, true -> <b>*</b> */}
            { props.isSpecial && <b>*</b>}
            Hello {props.name}
        </div>
    );
}

Hello.defaultProps = {  // 기본값 설정
    name: "no-name",
};

export default Hello;