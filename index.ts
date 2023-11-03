// Описание типа
type Item = {
    id: number | string
    parent: number | string
    type?: string | null
    childrens?: Item[]
    parentNode?: Item
}

// Описание класса
class TreeStore {
    private items: Item[]

    constructor(items: Item[]) {
        this.items = items
        
        // Преобазование массива в дерево
        this.items.forEach((value) => {
            // Добавление мыссива со ссылками на дочерние узлы
            value.childrens = items.filter((item) => item.parent === value.id)

            // Добавление ссылки на родительский узел
            value.parentNode = items.find((item) => item.id === value.parent)
        })
    }

    public getAll() {
        return this.items
    }

    public getItem(id: number | string) {
        return this.items.find((value) => value.id === id)
    }

    public getChildren(id: number | string) {
        return this.items.find((value) => value.id === id)?.childrens
    }

    public getAllChildren(id: number | string) {
        // Создаем массив элементами которого являются дочерние узды
        const data = this.items.find((value) => value.id === id)?.childrens!

        for (let index = 0; index < data.length; index++) {
            const item = data[index];

            // Если у текущего узла есть дочерние элементы то добавляем их в массив
            if (item.childrens) {
                data.push(...item.childrens)
            }
        }

        return data
    }

    public getAllParents(id: number | string) {
        const returnData : Item[] = []
        
        // Находим изначальный узел 
        let currentNode = this.items.find((value) => value.id === id)

        // Проходим по всем ссылкам на родительские узлы и добавляем их в возвращаемый массив
        while (currentNode) {
            currentNode = currentNode.parentNode
            if (currentNode) returnData.push(currentNode)
        }

        return returnData
    }
}

// Начальные данные
const items: Item[] = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

// Создание объекта дерева
const ts = new TreeStore(items);

// Функция для вывода в консоль
function logInConsole(description: string, result: any) {
    console.log(`${description}:`)
    console.log(result);
    console.log('--------------------------');
}

// Вывод результатов в консоль
logInConsole('Возвращение всех элементов', ts.getAll())
logInConsole('Возвращение элемента по id = 7', ts.getItem(7))
logInConsole('Возвращение дочерних элементов для id = 4', ts.getChildren(4))
logInConsole('Возвращение дочерних элементов для id = 5', ts.getChildren(5))
logInConsole('Возвращение дочерних элементов для id = 2', ts.getChildren(2))
logInConsole('Возвращение цепочки дочерних элементов для id = 2', ts.getAllChildren(2))
logInConsole('Возвращение цепочки родительских элементов для id = 7', ts.getAllParents(7))