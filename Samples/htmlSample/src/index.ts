import AIEHTML from './AIEHTML'

const aie = new AIEHTML('TESTER0001')
aie.start()


setInterval(() => {
    console.log('update prestances');
    if (window.aiee) {
        const prestances = JSON.stringify(window.aiee[0].getPrestances())
        if (prestances) {
            var event = new CustomEvent('aie-update', { 'detail': prestances });
            window.dispatchEvent(event);
        }
    }
}, 1000)
  