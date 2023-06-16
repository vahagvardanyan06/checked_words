const outputValue = document.querySelector(".output_value");
document.getElementById('searchForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    const searchInput = document.getElementById('searchInput');
    const word = searchInput.value.toLowerCase();
    const corectedWord = correctingWord(word)
    // Send GET request to server
    fetch(`http://localhost:3000/api/search?w=${corectedWord}`)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        // For example, display the result on the page
        if(data.exists === null){
            outputValue.innerHTML = "That word is not in base"
        }else{
            outputValue.innerHTML = corectedWord
        }
      })
      .catch(error => {
        console.error('Error searching for word:', error);
      });
    searchInput.value = ''; // Clear the input field
  });
function correctingWord(word){
    const wordArr = word.split("");
    let correctWord = '';
    for (let i = 0; i < wordArr.length; i++) {
        if (wordArr[i].match(/[a-z]/i)) {
          correctWord += wordArr[i];
        }
      }
    return correctWord
}