import { Flex, Text } from "@chakra-ui/react";
import { FaqItem } from "@core/model/FaqItem";
import Faq from "@frontend/components/Layout/Faq";
import React from "react";

const faqList: FaqItem[] = [
	{
		id: 1,
		question:
			"Qual a variedade de produtos e serviços que posso encontrar nesse catálogo online?",
		answer: "Nosso catálogo oferece uma ampla seleção de produtos e serviços especialmente selecionados para a comunidade brasileira no Japão. Você pode encontrar desde serviços de delivery de comida até serviços jurídicos para brasileiros que moram no Japão.",
	},
	{
		id: 2,
		question:
			"Como esse site pode me ajudar a encontrar serviços e soluções de qualidade mais facilmente?",
		answer: "Nosso site é dedicado a ajudar empresas e clientes brasileiros no Japão a encontrar facilmente os serviços que precisam em um único lugar. Com nosso catálogo, você pode encontrar uma grande variedade de serviços com facilidade, e com a interação direta com as empresas/profissionais cadastrados, você pode ter mais confiança em sua escolha.",
	},
	{
		id: 3,
		question:
			"Como faço para criar um perfil e divulgar meus dados de contato na plataforma?",
		answer: "É simples! Basta clicar no botão 'Criar Perfil' e seguir as instruções. Depois de preencher seus dados de contato, você poderá publicar um perfil com informações como descrição do negócio/serviço, imagem e links para redes sociais.",
	},
	{
		id: 4,
		question:
			"Quais são as vantagens de interagir com a comunidade brasileira no Japão e escrever depoimentos para as empresas/profissionais que estão no catálogo?",
		answer: "Com essa interação direta, você pode avaliar os serviços e produtos oferecidos e fornecer feedback valioso para outros usuários, contribuindo para a construção de uma rede colaborativa e confiável. Além disso, você pode se conectar com outras pessoas na comunidade brasileira no Japão e expandir sua rede de contatos.",
	},
	{
		id: 5,
		question:
			"Como posso entrar em contato com o catálogo online pelo Instagram?",
		answer: "Você também pode entrar em contato conosco pelo Instagram: @catalogojapao. Estamos sempre prontos para ouvir as suas sugestões, dúvidas e comentários, e responderemos o mais breve possível. Siga-nos e fique por dentro das novidades do nosso catálogo!",
	},
];

function SupportPage() {
	return (
		<Flex direction="column" w="full" h="full" align="center">
			<Text fontSize="lg" fontWeight="bold" mb={4}>
				Perguntas Frequentes
			</Text>
			<Faq faqList={faqList} />
			<Text
				fontSize="xs"
				fontWeight="semibold"
				bg="white"
				borderRadius="md"
				mt={2}
			>
				Precisa de ajuda ou tem alguma dúvida? Entre em contato conosco
				através do instagram: @catalogojapao.
			</Text>
		</Flex>
	);
}

export default SupportPage;
