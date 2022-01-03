//const array of months
export const months = ['None', 'Ja', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//helper function to display dates
export const setDate = (str) =>{
  if(str){
    const strArr = str.split('-')
  return months[Number(strArr[1])]+' '+strArr[2]+', '+strArr[0];
  }
  else return 'No Release Date';
}