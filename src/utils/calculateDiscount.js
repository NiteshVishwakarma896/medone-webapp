export const calculateDiscount = (props)=>{
    var mrp = props.mrp;
    var discount = props.discount;
    var discountCal = (mrp * discount)/100;
    var disPrice = (mrp-discountCal).toFixed(0);
    return disPrice
}