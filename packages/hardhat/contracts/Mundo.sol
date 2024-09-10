// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IERC20Token {
    function transfer(address, uint256) external returns (bool);
    function approve(address, uint256) external returns (bool);
    function transferFrom(address, address, uint256) external returns (bool);
    function totalSupply() external view returns (uint256);
    function balanceOf(address) external view returns (uint256);
    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

/**
 * @title Mundo E-commerce
 * @dev A decentralized e-commerce for listing and buying items using ERC20 tokens.
 */
contract Mundo {
    /// @notice Address of the contract owner
    address public owner;

    
    /// @notice ITEMID for autogenerating
    uint256 itemId;

    /// @notice Struct representing an item for sale
    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
        string description;
    }

    /// @notice Struct representing an order made by a user
    struct Order {
        uint256 time;
        Item item;
    }
    /// @notice Mapping of ERC20 tokens Allowed e.g Ckes, cUSD

    mapping(address =>bool)public checkAllowedTokens;

    /// @notice Mapping of item IDs to their corresponding items
    mapping(uint256 => Item) public items;

    /// @notice Mapping of user addresses to their orders
    mapping(address => mapping(uint256 => Order)) public orders;

    /// @notice Mapping of user addresses to their order count
    mapping(address => uint256) public orderCount;

    /// @notice Event emitted when a new item is listed
    event Buy(address indexed buyer, uint256 orderId, uint256 itemId);

    /// @notice Event emitted when an item is purchased
    event List(string name, uint256 cost, uint256 quantity);

    /// @notice Modifier to restrict access to only the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

/**
    *@notice Modifier to Check if token is allowed as a mode of payment
    *
    */
    modifier isTokenAllowed( address _tokenAddress){
        require(checkAllowedTokens[_tokenAddress],"token not allowed");
        _;
    }
    /**
     * @dev Constructor sets the initial owner of the contract
     */
    constructor() {
        owner = msg.sender;
    }

    

    /**
     * @notice List a new item for sale
    
     * @param _name The name of the item
     * @param _category The category of the item
     * @param _image A link to the image of the item
     * @param _cost The cost of the item in the ERC20 token
     * @param _rating The rating of the item
     * @param _stock The stock quantity of the item
     * @param _description A brief description of the item
     */
    function list(
        
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock,
        string memory _description
    ) public onlyOwner {
        // Create Item

        uint _itemid = itemId ;
        Item memory item = Item(
            _itemid,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock,
            _description
        );

        // Add Item to mapping
        items[_itemid] = item;
        itemId ++;

        // Emit event
        emit List(_name, _cost, _stock);
    }

    /**
     * @notice Purchase an item from the marketplace
     * @param _id The unique identifier of the item being purchased
     *@param  _tokenAddress erc20 token to pay with "cKes or Cusd"
     */
    function buy(uint256 _id, address _tokenAddress) public  isTokenAllowed(_tokenAddress) {
        // Fetch item
        Item memory item = items[_id];

        // Require enough ether to buy item
        

        // Require item is in stock
        require(item.stock > 0, "Item out of stock");

        // Create order
        Order memory order = Order(block.timestamp, item);

        // Add order for user
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Subtract stock
        items[_id].stock = item.stock - 1;

        // Pay order 
        require(
            IERC20Token(_tokenAddress).transferFrom(
                msg.sender,
                owner,
                item.cost
            ),
            "Transfer failed."
        );

        // Emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    /**
     * @notice Retrieve all orders made by a specific user
     * @param user The address of the user whose orders are being retrieved
     * @return  userOrders An array of orders made by the user
     */
    function getAllOrders(address user)
        external
        view
        returns (Order[] memory userOrders)
    {
        uint256 count = orderCount[user];
         userOrders = new Order[](count);

        for (uint256 i = 1; i <= count; i++) {
            userOrders[i - 1] = orders[user][i];
        }

        return userOrders;
    }

    /**
     * @notice Retrieve a specific order by order ID
     * @param user The address of the user who made the order
     * @param orderId The unique identifier of the order
     * @return The details of the specific order
     */
    function getOrder(address user, uint256 orderId)
        external
        view
        returns (Order memory)
    {
        return orders[user][orderId];
    }

    /**
     * @notice Retrieve item details by item ID
     * @param _itemId The unique identifier of the item
     * @return The details of the item
     */
    function getItem(uint256 _itemId)
        external
        view
        returns (Item memory)
    {
        return items[_itemId];
    }

    /**
    *@notice to return all marketplace items
    *@return item all the listed items on the market place
    */

    function getAllMarketPlaceItems()public view returns(Item[] memory item){
        item = new Item[](itemId);

        for(uint i=0; i<  itemId; i++){
            item[i] = items[i];

        }
    }

    /**
    *@notice Add token that are acceptable for payment  "cKes & cUSD"
    @param _tokenAddress The new ERC20 token to be added for payment
    */


    function addToken(address _tokenAddress)public onlyOwner(){
        require(!checkAllowedTokens[_tokenAddress],"token already listed");

        checkAllowedTokens[_tokenAddress] = true;

    }
}
