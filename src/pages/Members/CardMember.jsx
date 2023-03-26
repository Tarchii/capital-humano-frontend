import { Card } from 'antd';
import styled from 'styled-components';
const CardMember = ({ name, legajo, email, img }) => (
    <CardContainer>
        <ImageRow>
            <ImageWrapper>
                <img src={img} alt="member image" />
            </ImageWrapper>
        </ImageRow>
        <Name>
            [{legajo}] {name}
        </Name>
        <Email>
            {email}
        </Email>
    </CardContainer>
);

const CardContainer = styled.div`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: repeat(5, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
width: 250px;
height: 300px;
border-radius: 10px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
padding: 15px;
margin: 15px;
`;

const ImageRow = styled.div`
grid-area: 1 / 1 / 4 / 2;
display: flex;
justify-content: center;
align-items: center;
`;

const ImageWrapper = styled.div`
width: 150px;
height: 150px;
border-radius: 50%;
overflow: hidden;


img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

`;

const Name = styled.div`
grid-area: 4 / 1 / 5 / 2;
display: flex;
justify-content: center;
align-items: center;
font-size: 15px;
font-weight: bolder;
text-align: center;
`;

const Email = styled.div`
grid-area: 5 / 1 / 6 / 2;
display: flex;
justify-content: center;
align-items: center;
font-size: 10px;
font-weight: bolder;
`;

export default CardMember;