const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}
// Passing joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "c6241f8f7291490eba9a5aab819312ca",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// get jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Any";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // text-to-speech
    tellMe(joke);
    // disable button
    toggleButton();
  } catch (error) {
    // Catch error here
    console.error("whoops", error);
  }
}

// Even listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
