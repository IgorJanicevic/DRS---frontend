import "../assets/HomePage.css"



export const HomeLeftSide = () => {

    return (<>  
    <div className="sponsored">
    <h4>News</h4>

        <div className="sponsored-card">
          <img
            src="https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4"
            alt="Reklama 1"
            className="sponsored-image"
          />
          <div className="sponsored-text">
            <h4>News 1</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
    
        <div className="sponsored-card">
          <img
            src="https://picsum.photos/id/11/367/267"
            alt="Reklama 2"
            className="sponsored-image"
          />
          <div className="sponsored-text">
            <h4>News 2</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
    
        <div className="sponsored-card">
          <img
            src="https://picsum.photos/id/24/367/267"
            alt="Reklama 3"
            className="sponsored-image"
          />
          <div className="sponsored-text">
            <h4>New 3</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    
      <hr className="divider" />
    
      <div className="links">
        <h4>Useful Links</h4>
        <ul>
          <li><a href="https://www.linkedin.com/in/igor-janicevic-770075306/">Link 1</a></li>
          <li><a href="https://www.linkedin.com/in/ivan-dolenac-362734296/">Link 2</a></li>
          <li><a href="https://www.linkedin.com/in/du%C5%A1an-gordani%C4%87-a29331302/">Link 3</a></li>
          <li><a href="#">Link 4</a></li>
        </ul>
      </div></>);
}