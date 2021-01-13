//Sækja gögn frá Material UI
import {GridList, GridListTile, GridListTileBar, IconButton, } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';

//Sækja eigin gögn
import { checkIfMobile } from '../../services/browserServices';
import './styles.css';


//Tekur inn gangasafnið frá aðalsíðunni og brýtur það niður í griddið sem notandi sér.
//Hefði getað brotið enn smærra, sett GridListTile í sér component en þetta var svo lítið að ég sá ekki ástæðu til
const ImageList = ({imagesData}) => {

    //Tjekkar hvort að gagnasafnið sé undefined eða tómt
    if(typeof imagesData !== 'undefined' && imagesData != ''){

        //Fall sem segir forritinu hvort að tæki notanda sé sími eða tölva.
        const isMobile = (checkIfMobile()) ? 2 : 5;
        return(
            <div className="gridListDiv">
                <GridList className="gridList" cols={isMobile} cellHeight={250} spacing={6}>
                {
                    imagesData.map((singleImage, index) => (
                        <GridListTile key={index}>
                            <img src={singleImage.image.thumbnailLink} alt={singleImage.snippet}/>
                            <GridListTileBar
                                title={singleImage.title}
                                actionIcon={
                                    <IconButton onClick={()=>{window.open(singleImage.image.contextLink)}}>
                                        <LaunchIcon style={{ color: 'white'}}/>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))
                }
                </GridList>
            </div>
        );
    } else return (
        <p></p>
    );
}

export default ImageList;