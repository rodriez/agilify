import EventEmitter from 'events'
import notifier from "node-notifier"

export default class NotificationRepository extends EventEmitter {

    constructor() {
        super()
        
        this.on('card-created', this.onCardCreated)
        this.on('card-updated', this.onCardUpdated)
    }

    /**
     * @private
     */
    onCardCreated(card) {
        notifier.notify(`The card ${card.id} has been added in ${card.status} column`)
    }

    /**
     * @private 
     */
    onCardUpdated(card) {
        notifier.notify(`The card ${card.id} has been move to ${card.status} column`)
    }
}