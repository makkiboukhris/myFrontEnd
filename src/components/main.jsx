import React from 'react'

const Main = (props) => {
    return ( <div className="welcome">
<br/>
<h1 id="bigtitle">Embochez les plus talentueux <br/> avec un simple click.</h1>
<h1 id="description">Trouvez les meilleurs profils pour <br/> commencer votre business.</h1>
<br/>
<button onClick={()=>props.history.push('/LogIn')}>Commencer</button>
    </div> );
}

export default Main;