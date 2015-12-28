### Gerenciador de Cenas
Funciona como um gerenciador de rotas: É ela que define o que deve ser executado.

### Cenas
Funcionam como controllers. Gerenciam todo o código da cena atual

### Cena - Menu
Cena base para gerenciar cenas que envolvem apenas janelas e escolha de opções

### Cena - Mapa Ortogonal 2D
Cena que gerencia a exibição de mapas ortogonais 2D (formato padrão)

### Janela
Classe base para exibição de uma janela na tela.

### Janela de seleção
Classe base para exibição de janelas com listas de opções

### Bitmap
Objeto que representa uma imagem. Cada instância de bitmap cria um novo elemento canvas no DOM e possui métodos para facilitar o desenho neste elemento.
 
### Sprite
Funciona como um controller para um Bitmap. Permite ter sprites "filhos".

### Spriteset
Representa um grupo de sprites (esta classe herda de Sprite).

### InputManager
Controla os Inputs do usuário, seja por mouse, teclado, touch, gamepad ou leitura cerebral.

### Titlemap
Renderização de mapas