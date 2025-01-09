
const handleData = jsonData =>{
	//data.title, data.genre_ids, data.original_language, data.original_title, data.overview, data.release_date
	jsonData.forEach(data => console.log(`- ${data.title}`))
}

export default handleData;