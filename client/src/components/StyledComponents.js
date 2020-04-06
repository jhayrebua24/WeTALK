  import styled from 'styled-components';

  export const Container = styled.div`
    margin: 0 auto;
    padding: 0;
    width: 100%;
    max-width: 992px;
  `;

  export const Flexbox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
  `;

  export const FormSection = styled.section`
    width: 100%;
    max-width: 550px;
    margin-top: 10%;
  `;

  export const FormHeader = styled.div`
    background-color: #FFC872;
    padding: 23px 15px;
    margin: 0;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    color: #333;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 600;
    border-top-left-radius: 70px;
    border-top-right-radius: 70px;
    color: #006BBB;
  `;

  export const Form = styled.form`
    background-color: #FFE3B3;
    padding: 20px 30px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  `;

  export const FormRow = styled.div`
    margin: 10px 0;

    & .form-label {
      font-size: 18px;
      font-weight: 500;
      text-transform: capitalize;
    }
  `;

  export const FormInput = styled.input`
    width: 100%;
    padding: 10px 5px;
    font-size: 15px;
    box-sizing: border-box;
    border-radius: 3px;
    border: 0;
  `;

  export const StyledButton = styled.button`
      ${props => props.block ? `width: 100%;` : null}
      background-color: #30a0e0;
      box-sizing: border-box;
      padding: 10px 2px;
      font-size: 16px;
      color: #ffffff;
      border: 0;
      border-radius: 3px;
      cursor: pointer;
      display: inline-block;
  `;

  export const MessengerBox = styled.section`
    width: 100%;
    background-color: #FFE3B3;
    height: 500px;
    margin-top: 60px;
    border-radius: 5px;
    border: 2px solid #FFC872;
  `;

  export const MessengerHeader = styled.div`
    width: 100%;
    background-color: #FFC872;
    padding: 10px 10px;
    box-sizing: border-box;
    color: #006BBB;
    display: flex;
    justify-content: space-between;
    align:-items: center;

    & h2 {
      font-size: 27px;
      font-weight: 600;
      margin: 0;
    }

    & span {
      background: #d63031;
      border-radius: 50%;
      padding: 5px 10px;
      color: #fff;
      cursor: pointer;
    }

  `;

  export const MessengerContent = styled.div`
    display: flex;
    justify-content: ${props => props.isOwner ? 'flex-end' : 'flex-start'};
    & .msg-container {
      background: #006BBB;
      margin: 2px 0;
      padding: 3px 7px;
      color: #ffffff;
      max-width:50%;
      border-radius: 10px;
    }

    & .msg-sender {
      text-transform: capitalize;
      font-size: 12px;
      margin: 0px;
      padding: 0px;
      font-weight: 600;
    }

    & .msg-text {
      margin: 0px;
      font-size: 16px;
      padding: 0px;
      text-align: justify;
      text-justify: inter-word;
    }

    & .msg-time {
      font-size: 10px;
    }
  `;

  export const MessengerUserList = styled.div`
    flex-basis: 25%;
    border-right: 2px solid #FFC872;
    height: 440px;
    padding: 10px 10px;
    box-sizing: border-box;
    overflow-y: auto;
    & h3 {
      margin: 0;
      color: #006BBB;
      font-size: 20px;
      text-align: center;
    }

    & p {
      font-size: 18px;
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 5px;
      margin: 5px 0;

      & span {
        background-color: #4cd137;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }

    @media(max-width: 770px) {
      display: none;
    }
  `;

  export const MessageList = styled.div`
    background-color: #fff;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    height: 360px;
    overflow-y: auto;
  `;

  export const MessageContainer = styled.div`
    flex-basis: 75%;
    padding: 5px;
    box-sizing: border-box;
    @media(max-width: 770px) {
      flex-basis: 100%;
    }
  `;

  export const MessageInputForm = styled.form`
    display: flex;
    margin: 10px 0;
  `;

  export const MessageTextArea = styled.textarea`
    width: 100%;
    border-radius: 2px;
    font-size: 14px;
  `;

  export const ColoredText = styled.span`
    ${(props) => {
      const { type } = props;
      if (type === 'danger')
        return 'color: #dc3545;'
      else if (type === 'primary')
        return 'color: #007bff;'
      else if (type === 'success')
        return 'color: #28a745;'
      else if (type === 'warning')
        return 'color: #ffc107;'

      return 'color: #fffff;'
    }}
  `;

  export const CardErrors = styled.span`
    display: block;
    background: #d63031;
    color: #ffffff;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    margin: 5px 0;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 13px;

    animation: fadeIn ease 1s;
    -webkit-animation: fadeIn ease 1s;
    -moz-animation: fadeIn ease 1s;
    -o-animation: fadeIn ease 1s;
    -ms-animation: fadeIn ease 1s;
  
    @keyframes fadeIn {
      0% {
        opacity:0;
      }
      100% {
        opacity:1;
      }
    }
    
    @-moz-keyframes fadeIn {
      0% {
        opacity:0;
      }
      100% {
        opacity:1;
      }
    }
    
    @-webkit-keyframes fadeIn {
      0% {
        opacity:0;
      }
      100% {
        opacity:1;
      }
    }
    
    @-o-keyframes fadeIn {
      0% {
        opacity:0;
      }
      100% {
        opacity:1;
      }
    }
    
    @-ms-keyframes fadeIn {
      0% {
        opacity:0;
      }
      100% {
        opacity:1;
    }
  `;