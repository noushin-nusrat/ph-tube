// get categories data
const getTab = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const res = await response.json();
    const data = res.data;
    showTab(data)
}
// create tab button and pass the category data
const showTab = (options) => {
    const tabConteiner = document.getElementById('tab-conteiner')
    options.forEach(option => {
        // creating category list button
        const li = document.createElement('li');
        li.classList.add('list-none');
        // creating inner html for tab button
        li.innerHTML = `
        <button id="${option.category_id}"  onclick="tabHandler('${option.category_id}')" class="btn bg-btn-primary-clr  text-white py-1 px-2 lg:px-5 font-semibold text-lg active:bg-teal-500">${option?.category}</button>`
        tabConteiner.appendChild(li);
    });
}
// for data store
let fetchedVideos = [];
// video card data by category btn
const tabHandler = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const res = await response.json();
    const data = res?.data;
    // pass data to global variable to store for sort 
    fetchedVideos = data;
    // pass data to card conteiner without sort
    clickTab(fetchedVideos);
}
// card data after click the tab button
const clickTab = (videos) => {
    // get card conteiner
    const cardConteiner = document.getElementById('card-conteiner');
    // make empty card conteiner
    cardConteiner.innerText = '';
    // get html div box for no content. this conteiner will show if there is no data
    const emptyConteiner = document.getElementById('empty-conteiner');
    // condition to check is there any data available
    if (videos.length > 0) {
        emptyConteiner.classList.add('hidden');
        // get single video
        videos.forEach(items => {
            // get posted time
            const times = items?.others?.posted_date;
            const totalHr = convertTimeToHr(times);
            const totalMin = convertTimeToMin(times);
            // create card
            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = `
                <div class="focouscard space-y-5 ">
                    <div class="relative">
                        <figure><img class="rounded-lg  w-full h-52" src="${items?.thumbnail}" alt="" /></figure>
                        ${times ? `<p class="absolute rounded px-2 py-1 bg-slate-800 text-white right-5 bottom-5  "><span>${totalHr}</span> hrs <span>${totalMin}</span> min ago</p>` : ''}
                    </div>
                    <div class="focouscard-body flex gap-3">
                        <img class="w-10 h-10 rounded-full" src="${items?.authors[0]?.profile_picture}.jpg" alt="">
                        <div class="space-y-2">
                            <h2 class="font-bold text-base">${items?.title}<div></div>
                            </h2>
                            <div class="flex gap-2">
                            <h4 class="font-normal text-sm text-gray-600">${items?.authors[0]?.profile_name}</h4>
                            <div>${items?.authors[0]?.verified ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clip-path="url(#clip0_13_960)">
                              <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                              <path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92669C6.88909 8.52512 6.23752 8.52512 5.83596 8.92669C5.4344 9.32825 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_13_960">
                                <rect width="20" height="20" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>`: ''}</div>
                          </div>
                            <p class="font-normal text-sm text-gray-600">${items?.others?.views} views</p>
                        </div>
                    </div>
                </div>`
            cardConteiner.appendChild(cardDiv);
        });
    } else {
        emptyConteiner.classList.remove('hidden')
    }
}
// sorting videos by views
const filterByViewHandler = () => {
    sortByView(fetchedVideos);
}
// condition for sort
const sortByView = (dataForSort) => {
    console.log(dataForSort);
    dataForSort.sort((a, b) => {
        const viewA = parseFloat(a.others.views);
        const viewB = parseFloat(b.others.views);
        if (viewA < viewB) {
            return 1;
        }
        if (viewA > viewB) {
            return -1;
        }
    });
    // sending sorted data
    clickTab(dataForSort);
}
// go to blog page
const blogSite = () => {
    window.location.href = 'blog.html';
}
// hour calculator
const convertTimeToHr = (seconds) => {
    const hour = seconds / 3600;
    const exectHr = Math.floor(hour)
    const min = hour - exectHr;
    const exectMin = Math.floor(min * 60)
    return exectHr;
}
// min calculator
const convertTimeToMin = (seconds) => {
    const hour = seconds / 3600;
    const exectHr = Math.floor(hour)
    const min = hour - exectHr;
    const exectMin = Math.floor(min * 60)
    return exectMin;
}

getTab();
tabHandler(1000);