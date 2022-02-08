import { AvailableProduct } from "./AvailableProductType"
import { BasketItem } from "./BasketItemType"

type State = {
    availableProducts: AvailableProduct[]
    basket: BasketItem[]
}

export default State