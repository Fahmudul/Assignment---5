const seatButton = document.querySelectorAll('.seat-btn');
let selectedSeats = 0;
const ticketPrice = 550;
const ticketClass = 'Economy'
let totalPrice = 0
const couponText = document.getElementById('coupon-field')
const alreadySelectedSeats = []
let minimumSelectedSeats = 0
const phoneNumberLength = document.getElementById('phone-number')


for (let index = 0; index < seatButton.length; index++) {
    // console.log(seatButton[index])
    seatButton[index].addEventListener('click', (e) => {
        if (selectedSeats < 4 && !alreadySelectedSeats.includes(e.target.id)) {
            alreadySelectedSeats.push(e.target.id)
            changeBackgroundColor(e.target.id)
            disableButton(e.target.id)

            const newTicket = document.createElement('div')
            newTicket.classList.add("flex", "justify-between", "pt-3")
            newTicket.innerHTML = `
            <h5 class="  text-sm ">${e.target.innerText}</h5>
            <h5 class="  text-sm ">${ticketClass}</h5>
            <h5 class="  text-sm ">${ticketPrice}</h5>
            `
            document.getElementById('chosen_seats').appendChild(newTicket)

            totalPrice += ticketPrice
            document.getElementById('current-price').innerText = totalPrice
            document.getElementById('grand-price').innerText = totalPrice
            let selectedSeatsNumber = parseInt(document.getElementById('selected_seat_number').innerText)
            // console.log(selectedSeatsNumber)
            selectedSeatsNumber++
            document.getElementById('selected_seat_number').innerText = selectedSeatsNumber
            let seatDecreased = parseInt(document.getElementById('totalSeatDecrease').innerText)
            // console.log(selectedSeatsNumber)
            seatDecreased--
            document.getElementById('totalSeatDecrease').innerText = seatDecreased

            selectedSeats++
            minimumSelectedSeats++
            console.log(selectedSeats, minimumSelectedSeats)
            // Discount Section
            if (selectedSeats == 4) {
                document.getElementById('apply-btn').addEventListener('click', function showCoupon() {

                    if (couponText.value === 'NEW15') {
                        console.log(couponText.value)
                        let discountSection = document.getElementById('discount-price')
                        let discountPrice = totalPrice * 0.15
                        document.getElementById('discount-container').classList.remove('hidden')
                        document.getElementById('apply-container').classList.add('hidden')

                        document.getElementById('discount-price').innerText = discountPrice

                        // let grandPrice = document.createElement('div')
                        // document.getElementById('discount-price').innerText = discountPrice


                        document.getElementById('grand-price').innerText = totalPrice - discountPrice
                        document.getElementById('apply-btn').style.display = 'none'
                        couponText.value = ""

                    }
                    else if (couponText.value === 'Couple 20') {
                        // let discountSection = document.createElement('div')
                        let discountSection = document.getElementById('discount-price')
                        let discountPrice = totalPrice * 0.20
                        document.getElementById('discount-container').classList.remove('hidden')
                        document.getElementById('apply-container').classList.add('hidden')

                        document.getElementById('discount-price').innerText = discountPrice

                        // let grandPrice = document.createElement('div')
                        // document.getElementById('discount-price').innerText = discountPrice


                        document.getElementById('grand-price').innerText = totalPrice - discountPrice
                        document.getElementById('apply-btn').style.display = 'none'
                        couponText.value = ""

                    }
                    else {
                        alert('Enter a valid coupon')
                    }
                })

            }




        }
        else {

            disableButton(e.target.id)
        }


    })
}

document.getElementById('apply-btn').addEventListener('click', () => {
    if (selectedSeats != 4) {
        alert('Please select 4 seats')
    }
})

document.getElementById('confirm-btn').addEventListener('click', () => {
    console.log(phoneNumberLength)
    if (minimumSelectedSeats >= 1 && phoneNumberLength.value.length == 11) {
        document.getElementById('main-content').classList.add('hidden')
        document.getElementById('order-confirm').classList.remove('hidden')
    }
    else {
        if (minimumSelectedSeats < 1 && phoneNumberLength.value.length < 11) {

            alert('Please select one seat and your phone number')
        }
        else if (phoneNumberLength.value.length != 11) {
            alert('Provide a valid phone number!')
        }
        else {
            alert('Please select atleast one seat to confirm!')
        }

    }

})



function changeBackgroundColor(elementId) {
    document.getElementById(elementId).style.backgroundColor = '#1dd100'
    document.getElementById(elementId).style.color = '#ffffff'

}

function disableButton(elementId) {
    document.getElementById(elementId).setAttribute('disable', 'true')
}

function scrollToSection(elementId) {
    let section = document.getElementById(elementId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}