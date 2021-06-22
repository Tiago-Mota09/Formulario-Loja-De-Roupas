aProdutos = Array(
["001", 85.70,	"Blusa Manga Curta", 	 "imagem1.png"], 
["002", 122.00, "Blusa Tomara que Caia", "imagem2.png"], 
["003", 95.00, 	"Blusa Manga Larga", 	 "imagem3.png"],
["004", 129.55, "Blusa Especial", 	 ""]
)

function popularListas(){
	// produto1, produto2 e produto3
	
	// Varrendo a matriz de produtos
	
	for(let prods=1; prods<=3; prods++){
		let nomeCampo="produto"+prods
		
		// Como existem 3 listas de produtos, estas 3 listas serão atualizadas
		for(let n=0; n<aProdutos.length; n++){
			let opcao = document.createElement("option")
			opcao.value = aProdutos[n][0] // guarda o código do produto
			opcao.text  = aProdutos[n][2] // guarda o nome do produto
			document.getElementById(nomeCampo).appendChild(opcao)
		}
	}
}

function Real(numero){
return (Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(numero))
}

function Real(numero){
return (Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(numero))
}

function Hoje (numDias) {
	// função retorna uma determinada data 
	// num string no formato YYYY-MM-DD
	var hoje = new Date()

	// É para aumentar a data?
	if(numDias > 0) {
	hoje.setDate(hoje.getDate() + numDias)
	}

	// Pegar o dia - e transformar em String (é número)
	// e preencher com 0 à esquerda - 2 dígitos
	var dia = hoje.getDate().toString().padStart(2,'0')

	// Pegar o mês
	var mes = (hoje.getMonth() + 1).toString().padStart(2,'0')
	var ano = hoje.getFullYear()

	// Monta o string de retorno no formato "YYYY-MM-DD"
	var stringData = ano + "-" +  mes + "-" + dia

	return(stringData)
}

function formataMoeda(numero){
var numeroFormatado = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(numero)

return(numeroFormatado)
}
function mostraArea(objBotao, nomeArea) {
btn1.className="botaoNormal"
btn2.className="botaoNormal"
btn3.className="botaoNormal"
btn4.className="botaoNormal"
objBotao.className="botaoAceso"

areaItens.style.display="none"
areaCliente.style.display="none"
areaEntrega.style.display="none"
areaPagamento.style.display="none"
document.getElementById(nomeArea).style.display="block"
}

function qtdProduto(numProd) {
	let nomeCampo = "qtdProduto" + numProd // Traz a qtd do produto
	let qtd = parseInt(document.getElementById(nomeCampo).value)
	return (qtd)
}

function precoProduto(codigo) {
	let valor = 0
	for (let n = 0; n < aProdutos.length; n++) {
			if (aProdutos[n][0] == codigo) {
					// encontrei - atualizo variável
					valor = aProdutos[n][1]
			}
	}
	return (valor)
}


function custoTotalProduto(numProd) {
	let nomeCampo = "produto" + numProd
	let codigoProduto = document.getElementById(nomeCampo).value
	let valorUnitario = precoProduto(codigoProduto)
	let qtd = qtdProduto(numProd)
	let valorTotal = 0

	if ((valorUnitario > 0) && (qtd > 0))
			valorTotal = valorUnitario * qtd

	return (valorTotal)
}


function custoEmbProduto(numProd) {
	let nomeCampo = "embProduto" + numProd // Traz o nome do campo de embalagem do produto
	let valorEmbalagem = 0

	if (document.getElementById(nomeCampo).checked) {
			let qtd = qtdProduto(numProd)
			if (qtd > 0) {
					valorEmbalagem = qtdProduto(numProd) * 10
					if (valorEmbalagem > 25) {
							valorEmbalagem = 25
					}
			}
	}
	return (valorEmbalagem)
}

function CalcularTotal(){
$totalItens=0 // valor dos itens
$valorCupom=0 // Desconto por cupom
$valorPedido=0 // zerando variável global valor total pedido
$descontoItens=0 // Desconto se total itens passar R$ 1000.00
$custoEmbalagem=0 // custo de embalagem p/presente total
$valorFrete=0 // Valor do frete

// Calculando os totais dos itens informados no formulário
$valorPedido  = custoTotalProduto(1) + custoTotalProduto(2) + custoTotalProduto(3) 
$totalItens = $valorPedido

// Exibindo painel - linha 1
resumoTotItens.innerHTML = formataMoeda($totalItens)

// Calculando o desconto por cupom
if($percDescCupom >0){
	$valorCupom = $totalItens * $percDescCupom/100
}

// Exibindo painel - linha 2
resumoCupom.innerHTML = formataMoeda($valorCupom)

var subTotal = $totalItens - $valorCupom

// Exibindo painel - linha 3 - 1o subtotal
resumoSubTot1.innerHTML=formataMoeda(subTotal)
	
if(subTotal>=1000){
	// aplicando o desconto de 5% (total itens > 1000.00)
	$descontoItens=subTotal*5/100
	subTotal = subTotal-$descontoItens
}	

// Exibindo painel - linha  4
resumoDescVlrPedido.innerHTML = formataMoeda($descontoItens)

// Exibindo painel - linha 5 - 2o subtotal	
resumoSubTot2.innerHTML = formataMoeda(subTotal)


// Exibindo painel - linha 6
$custoEmbalagem = custoEmbProduto(1) + custoEmbProduto(2) + custoEmbProduto(3)
resumoEmbalagem.innerHTML= formataMoeda($custoEmbalagem)

// Exibindo painel - linha 7 - 3o subtotal	
subTotal += $custoEmbalagem
resumoSubTot3.innerHTML = formataMoeda(subTotal)

// cálculo do frete

switch(formaEntrega.value){
	case "PAC":
		$valorFrete=30
		break
	case "SEDEX":
		$valorFrete=70
		break
	case "TRANSP":
		$valorFrete=50
		break
}

if ( ($retiraLoja) || ($valorPedido>1000) ){
	//  Retira loja ou pedido > 1000
	$valorFrete=0
}

// Exibindo painel - linha 8 - frete
resumoFrete.innerHTML = formataMoeda($valorFrete)
subTotal += $valorFrete

// Exibindo painel - linha 9 - TOTAL DO PEDIDO
$valorPedido =  subTotal
resumoValorPedido.innerHTML = formataMoeda($valorPedido)

// mostrando o valor estimado do pedido
valorEstimadoPedido.innerHTML = formataMoeda($valorPedido)
}

function CalcularProduto(numProd) {
numProd=parseInt(numProd) // transformando num número inteiro
if((numProd>0) &&(numProd<=3)){
	// limitando a 3 produtos
	
	// nome produto1, produto2 ou produto3
	var nomeCampo = "produto" +  numProd
	
	// Pegando o código do produto escolhido
	var codigo = document.getElementById(nomeCampo).value
	
	var valor =0  // valor padrão da variável
	var imagem="" // valor padrão da variável
	
	// Procurando o código na matriz de produtos
	for(let n=0; n<aProdutos.length; n++){
		if(aProdutos[n][0]==codigo){
			// encontrei - atualizo as variáveis
			valor = aProdutos[n][1]
			imagem= aProdutos[n][3]
		}
	}
	
	// Se tem imagem vamos mostrar dentro do span areaImagem
	// Se não tem, apaga-se qualquer conteúdo anterior
	areaImagem.innerHTML=""
	if(imagem!==""){
		areaImagem.innerHTML = "<img src='imgs/" + imagem + "'>"
	}
	
	// nome qtdProduto1, qtdProduto2 ou qtdProduto3
	var nomeCampo = "qtdProduto" +  numProd
	// Pegando a qtd do produto escolhido
	var qtd = parseInt(document.getElementById("qtdProduto1").value)
	
	// nome prProduto1, prProduto2 ou prProduto3
	var nomeCampo = "prProduto" +  numProd
	// Pegando o campo que armazenará o preço do produto escolhido
	var objPrProd= document.getElementById(nomeCampo)
	
	// nome somaProduto1, somaProduto2 ou somaProduto3
	var nomeCampo = "somaProduto" +  numProd
	// Pegando o campo que armazenará o valor total (preçoxqtd) do produto escolhido
	var objSomaProd = document.getElementById(nomeCampo)
	
	// Atualizando o preço do produto escolhido
	objPrProd.value=Real(valor) 
	
	// Calculando o preço atualizado pela qtd do prod. escolhido
	var total = valor * qtd 
	
	// Atualizando a caixa de soma do produto em R$
	objSomaProd.value = Real(total)
}

// Depois de atualizar os dados do produto, calcula-se o total do pedido
CalcularTotal() 
}

function areaPFPJ(obPessoa){
if(obPessoa.value=="PF")
{
	areaPF.style.display="block"
	areaPFDoc.style.display="block"

	areaPJ.style.display="none"
	areaPJDoc.style.display="none"
}
else 
{
	areaPF.style.display="none"
	areaPFDoc.style.display="none"

	areaPJ.style.display="block"
	areaPJDoc.style.display="block"
}
}

function ValidaCPF(textoCPF){
var ret=false // valor padrão de retorno

if(textoCPF){
	// se foi enviada a variável textoCPF
	
	// A rotina irá percorrer a string e pegando apenas os números e colocando
	// estes números dentro de cpfNumero
	var cpfNumero=""
	
	// Ela conterá apenas números em formato de String (texto)
	// O motivo disto é que existem CPFs cujo primeiro número é zero
	// Desta forma, é necessário usar uma variável do tipo String.
		
	// Parte 1 - transformando o cpf informado em apenas números
	var tamanho = textoCPF.length // Tamanho em caracteres da string
	for(var n=0; n<tamanho; n++){
		// varrendo o string - caractere a caractere
		var caractere=textoCPF.substr(n,1) // pegou o caractere
		if ((caractere>="0") && (caractere<="9")) {
			// Caractere está entre "0" e "9"
			// Acumulo-o na variável 
			cpfNumero+=caractere
		}
	}
	console.log("cpfNumero =" + cpfNumero)
	
	// Já passou pelo loop
	if(cpfNumero.length==11){
		// Variável cpfNumero tem 11 posições 
		
		// Parte 2: separando os 1os 9 dígitos do CPF para calcular o DV
		var cpfBase = cpfNumero.substr(0,9)
		console.log("cpfBase =" + cpfBase)
		
		// Validando o cpfBase
		// Passo 1 - Calculando o 1o dígito verificador
		// Pegando os 9 dígitos do cpf e multiplicando-os por
		// um número que vai de 10 e decresce
		
		var soma=0 // inicialização da variável de soma
		var multiplicador=10 //
		
		for(var n=0; n<9; n++) {
			
			var digito = parseInt(cpfBase.substr(n,1)) // peguei um número
			var calculoDigito = digito * multiplicador
			console.log(digito + " x " + multiplicador+ " = " + digito*multiplicador)
			// Passo 2 - somando
			soma+=calculoDigito // fazendo a soma / acumulação
			multiplicador-- // decrescendo o fator multiplicador
		}
		
		// soma pronta - mostrando no console
		console.log("Soma =" + soma)
		
		// Passo 3 - aplicando o módulo
		var modulo = soma % 11
		
		// Passo 4 – Obtendo o 1º dígito do código validador
		var mod11 = 11 - modulo
		console.log("Mod11 =" + mod11)
		
		if(mod11 > 9){
			mod11 = 0
			console.log("Mod11 =" + mod11)
		}
		var digito1 = mod11 // Salvando o 1o dítigo
		
		// Passo 5 – Obtendo o 2º dígito do código validador

		var soma=0 // inicialização da variável de soma
		var multiplicador=11
		for(var n=0; n<9; n++) {
			
			var digito = parseInt(cpfBase.substr(n,1)) // peguei um número
			var calculoDigito = digito * multiplicador
			console.log(digito + " x " + multiplicador+ " = " + digito*multiplicador)
			// Passo 6 - somando
			soma+=calculoDigito // fazendo a soma / acumulação
			multiplicador-- // decrescendo o fator multiplicador
		}
		
		// colocar na soma o multiplicador do 1o dígito
		var calculoDigito = digito1 * 2
		console.log(digito1 + " x 2 = " + digito1*2)			
		soma+=calculoDigito

		// soma pronta - mostrando no console
		console.log("Soma =" + soma)
		
		// Passo 7 – Aplicar o módulo 11
		modulo = soma % 11
		
		// Passo 8 – Obtendo o 2º dígito do código validador
		var mod11 = 11 - modulo
		console.log("Mod11 =" + mod11)
		
		if(mod11 > 9){
			mod11 = 0
			console.log("Mod11 =" + mod11)
		}
		var digito2 = mod11 // Salvando o 2o dítigo
		
		// cálculo finalizado - compondo o cpf calculado
		var cpfCalculado = cpfBase + digito1 + digito2
		console.log("CPF Calculado =" + cpfCalculado)
		
		if(cpfNumero==cpfCalculado){
			// Cpf informado é igual ao cpf calculado
			ret = true
		}
	}

}
return(ret)
}

function valida(area){
if(area=='areaCliente'){
	if(!ValidaCPF(cpf.value)){
		alert("CPF não é  válido!")
	}
}
	
}

function verificaCanal(canalInformado){
if(canalInformado=="L"){
	// venda via loja - habilita retirada em loja
	retirada.style.display="block"
	opcaoRetirada.disabled = false // habilito a escolha de retirada na loja
}
else{
	retirada.style.display="none" // não pode escolher tipo de retirada
	opcaoRetirada.value="E" // seto como entrega
	$retiraLoja=false // desabilito o controle de frete para retirada na loja
	opcaoRetirada.disabled = true // desabilito a escolha de retirada da loja
	formaEntrega.selectedIndex=0
}
}

function opcaoRetirada(opcao){
if(opcao=="E"){
	// opção é de entrega - mostrar os campos de endereço do cliente
	entregaEndereco.style.display="block"
	$retiraLoja=false // desabilito o controle de frete para retirada na loja
	
	// Habilita formas de entrega de correio, pac, sedex
	areaRetirada.style.display="block" 
}
else{
	entregaEndereco.style.display="none"
	$retiraLoja=true // único local em que se habilita a retirada do produto na loja
	
	// Desabilita formas de entrega de correio, pac, sedex
	areaRetirada.style.display="none" 
}
CalcularTotal() // atualizar o resumo totalizado
}

function ValidaCupom(codigoCupom){
// matriz de cupons - % igual de desconto = 5%
var aCupons = Array(
	["pascoa"	, 5],
	["novo"		, 10],
	["indica"	, 6]
)

// Limpando o percentual do cupom de desconto
$percDescCupom=0

// Limpando o texto do lado do cupom
textoCupom.innerHTML=""

// Limpando o texto do resumo da % de cupom de desconto
resumoTxtCupom.innerHTML="Cupom de Desconto"

// foi digitado um cupom?
if(codigoCupom.length>0)
{
	// colocando o código digitado em minúsculo
	codigoCupom = codigoCupom.toLowerCase()
	
	// verificando se o cupom é válido
	// cupom digitado está dentro da matriz de cupons
	for(let n=0; n<aCupons.length;n++){
		if(aCupons[n][0]==codigoCupom){
			// achou o cupom - recuperar o % de desconto
			$percDescCupom = aCupons[n][1]
			textoCupom.innerHTML="<img src='imgs/ok.png' width='20'>" // mostrando ok
			
			// Ajustando o texto do resumo da % de cupom de desconto
			resumoTxtCupom.innerHTML = "Cupom de Desconto (" + $percDescCupom +"%)"
		}
	}
	
	if($percDescCupom==0)
		textoCupom.innerHTML="<img src='imgs/erro.png' width='20'>"
}
CalcularTotal()
}
