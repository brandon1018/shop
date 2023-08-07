import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';

let YellowButton = styled.button`
    background : ${props => props.background};
    color : ${props => props.background == 'blue' ? 'white' : 'black'};
    padding : 10px; 
`

function Detail(props) {
    let { id } = useParams();
    let item = props.shoes.find((item) => { return item.id == id });
    let imageSrc = `https://codingapple1.github.io/shop/shoes${Number(id) + 1}.jpg`
    let [yellowButtonToggle, setYellowButtonToggle] = useState("show");

    useEffect(() => {
        console.log('로딩이 오래걸리는 것들은 여기에 놓으면 HTML 렌더링 이후에 실행');
        setTimeout(() => {
            setYellowButtonToggle('hide');
        }, 2000, []);
    });

    return (
        <div className="container">
            {
                yellowButtonToggle == 'show' ? <YellowButton background="blue">button</YellowButton> : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={imageSrc} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{item.title}</h4>
                    <p>{item.content}</p>
                    <p>{item.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;