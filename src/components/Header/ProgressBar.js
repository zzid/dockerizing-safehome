import styled from 'styled-components'

const  ProgressBar  =  styled.div
`
  position: relative;
  background:  linear-gradient(
    to right,
    rgb(70, 160, 206) ${props => props.scroll},
    transparent  0);
  width:  100%;
  height:  7px;
  display: flex;
  flex-direction: column;
  z-index:  3;
`

export default ProgressBar