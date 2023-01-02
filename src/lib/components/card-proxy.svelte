<script>
	import Card from "./card.svelte";

  // image props
  export let img = undefined;
  export let back = undefined;
  export let foil = undefined;
  export let mask = undefined;

  // data / pokemon props
  export let name = undefined;
  export let number = undefined;
  export let set = undefined;
  export let types = undefined;
  export let subtypes = undefined;
  export let supertype = undefined;
  export let rarity = undefined;

  // context/environment props
  export let showcase = false;

  const isDefined = (v) => {
    return typeof v !== "undefined" && v !== null;
  }

  const cardImage = () => {
    if ( isDefined( img ) ) {
      return img;
    }
    if ( isDefined( set ) && isDefined( number ) ) {
      return `https://images.pokemontcg.io/${ set.toLowerCase() }/${ number }_hires.png`;
    }
    return "";
  }
  
  const foilMaskImage = ( prop, type = "masks" ) => {

    let etch = "holo";
    let style = "reverse";
    let ext = type === "masks" ? "png" : "jpg";

    if ( isDefined( prop ) ) {
      if ( prop === false ) {
        return "";
      }
      return prop;
    }

    if( !isDefined( rarity ) || !isDefined( subtypes ) || !isDefined( supertype ) || !isDefined( set ) || !isDefined( number ) ) {
      return "";
    }

    const fRarity = rarity.toLowerCase();
    const fNumber = number.toString().toLowerCase().replace( "swsh", "" ).padStart( 3, "0" );
    const fset = set.toString().toLowerCase().replace( "tg", "" ).replace( "sv", "" );

    if ( fRarity === "rare holo" ) {
      style = "swholo";
    }

    if ( fRarity === "rare holo cosmos" ) {
      style = "cosmos";
    }

    if ( fRarity === "radiant rare" ) {
      etch = "etched";
      style = "radiantholo";
    }

    if ( fRarity.includes( "rare holo" ) && fNumber.startsWith( "tg" ) ) {
      etch = "holo";
      style = "rainbow";
    }

    if ( fRarity.includes( "rare shiny" ) && fNumber.startsWith( "sv" ) ) {
      etch = "etched";
      style = "sunpillar";
    }

    if ( fRarity === "rare holo v" ) {
      etch = "holo";
      style = "sunpillar";
    }

    if ( fRarity.includes( "rare holo v" ) && fNumber.startsWith( "tg" ) ) {
      etch = "etched";
      style = "sunpillar";
    }
    
    if ( fRarity === "rare holo vmax" || fRarity === "rare ultra" || fRarity === "rare holo vstar" ) {
      etch = "etched";
      style = "sunpillar";
    }
    
    if ( fRarity === "amazing rare" || fRarity === "rare rainbow" || fRarity === "rare secret" ) {
      etch = "etched";
      style = "swsecret";
    }
    
    if ( fRarity === "rare shiny v" || (fRarity === "rare holo v" && fNumber.startsWith( "sv" )) ) {
      etch = "etched";
      style = "sunpillar";
      rarity = "Rare Shiny V";
      console.log(`/img/foils/${ fset }/${ type }/${ fNumber }_foil_${ etch }_${ style }.${ ext }`)
    }
    
    if ( fRarity === "rare shiny vmax" || (fRarity === "rare holo vmax" && fNumber.startsWith( "sv" )) ) {
      etch = "etched";
      style = "swsecret";
      rarity = "Rare Shiny VMAX";
      console.log(`/img/foils/${ fset }/${ type }/${ fNumber }_foil_${ etch }_${ style }.${ ext }`)
    }

    return `/img/foils/${ fset }/${ type }/${ fNumber }_foil_${ etch }_${ style }.${ ext }`;
  }

  const foilImage = () => {
    return foilMaskImage( foil, "foils" );
  }

  const maskImage = () => {
    return foilMaskImage( mask, "masks" );
  }

  const proxy = {
    
    img: cardImage(),
    back,
    foil: foilImage(),
    mask: maskImage(),

    name,
    number,
    set,
    types,
    subtypes,
    supertype,
    rarity,
    showcase

  }

</script>





<Card {...proxy} />