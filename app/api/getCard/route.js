const cards = [
  {"id":1,"word":"abandon","type":"(v)","ipa":"/ə'bændən/","cefr_level":"B2","en":"to stop an activity before it is finished, usually because you think you cannot succeed","example_en":"We have to abandon the plan.","ipa_example":"/wi həv tʊ əˈbændən ðə plæn/","vi":"abandonner","example_vi":"Nous devons abandonner le plan.","connect":"","image":"1P9y8yEbnkSHzT8Dy9RLNzTKiSNSmGyFQ"},
  {"id":2,"word":"abandoned","type":"(adj)","ipa":"/ə'bændənd/","cefr_level":"B2","en":"left and no longer wanted, used or needed","example_en":"He hid in an abandoned building.","ipa_example":"/hiː hɪd ɪn ən əˈbændənd ˈbɪldɪŋ/","vi":"abandonné(e), délaissé(e), déserté(e)","example_vi":"Il s'est caché dans un bâtiment abandonné.","connect":"","image":"1qnmgG_lKieEMZU5tBWIyAmrUWBlmc5bu"},
  {"id":3,"word":"ability","type":"(n)","ipa":"/ə'biliti/","cefr_level":"B1","en":"the fact that somebody/something is able to do something","example_en":"She has the ability to manage a business.","ipa_example":"/ʃiː həz ðiː əˈbɪlɪtɪ tə ˈmænɪʤ ə ˈbɪznɪs/","vi":"capacité","example_vi":"Elle a la capacité de gérer une entreprise.","connect":"","image":"1F-fLdVhraptKI26g3SqNy2WRBsS2oaKY"},
  {"id":4,"word":"able","type":"(adj)","ipa":"/'eibl/","cefr_level":"A2","en":"intelligent or good at what you do","example_en":"I am able to swim across the river.","ipa_example":"/aɪ æm ˈeɪbl tə swɪm əˈkrɒs ðə ˈrɪvə/","vi":"capable","example_vi":"Je suis capable de nager à travers la rivière.","connect":"","image":"1f2yqtdmPoaMYa58Bb5toHZHW9agBgOKr"},
  {"id":5,"word":"about","type":"(adv, prep)","ipa":"/ə'baut/","cefr_level":"A1","en":"on the subject of, or connected with","example_en":"I don't care about your past.","ipa_example":"/aɪ dəʊnt keə əˈbaʊt jə pɑːst/","vi":"À propos","example_vi":"Je me fiche de ton passé.","connect":"","image":"1w17P84DUU3I4Ohz0uKEnB76VcK_RYx8M"},
  {"id":6,"word":"above","type":"(adv)","ipa":"/ə'bʌv/","cefr_level":"A1","en":"at or to a higher place or position than something/somebody","example_en":"She lives in an apartment above us.","ipa_example":"/ʃiː laɪvz ɪn ən əˈpɑːtmənt əˈbʌv ʌs/","vi":"dessus","example_vi":"Elle vit dans un appartement au-dessus de nous.","connect":"","image":"1HZmUIdz0bHnJTzImh33HHNef2EQLtUfL"},
  {"id":7,"word":"abroad","type":"(adv)","ipa":"/ə'brɔ:d/","cefr_level":"B1","en":"in or to a foreign country","example_en":"I plan to go abroad in November.","ipa_example":"/aɪ plæn tə gəʊ əˈbrɔːd ɪn nəʊˈvembə/","vi":"à l’étranger","example_vi":"Je prévois de partir à l'étranger en novembre.","connect":"","image":"1M4B8uSD6tDoerweW5HKH-M49PpuwOY03"},
  {"id":8,"word":"absence","type":"(n)","ipa":"/'æbsəns/","cefr_level":"B2","en":"a time when someone is not at work or at the place they are expected to be","example_en":"I don't know the reason for her absence.","ipa_example":"/aɪ dəʊnt nəʊ ðə ˈriːzn fə hɜː ˈæbsəns/","vi":"absence","example_vi":"Je ne connais pas la raison de son absence.","connect":"","image":"1LKDQfDISFfEYrn9Yvumul9X1ZHG1OOo7"},
  {"id":9,"word":"absent","type":"(adj)","ipa":"/'æbsənt/","cefr_level":"B1","en":"not in a place because of illness, etc","example_en":"He is often absent from school.","ipa_example":"/hiː ɪz ˈɒfn ˈæbsənt frɒm skuːl/","vi":"absent(e), manquant(e)","example_vi":"Il est souvent absent de l'école.","connect":"","image":"1Jb2cG3h4u1I5HCbTqJMT9EcHWyxniNGL"},
  {"id":10,"word":"absolute","type":"(adj)","ipa":"/'æbsəlu:t/","cefr_level":"B2","en":"very great or to the largest degree possible, used when expressing a strong opinion","example_en":"I need absolute silence when I'm working.","ipa_example":"/aɪ niːd ˈæbsəluːt ˈsaɪləns wen aɪm ˈwɜːkɪŋ/","vi":"absolu","example_vi":"J'ai besoin d'un silence absolu lorsque je travaille.","connect":"","image":"1awfrUaKKrgjkjoayysKHmwS7lB2HG879"},
  {"id":11,"word":"absolutely","type":"(adv)","ipa":"/'æbsəlu:tli/","cefr_level":"B1","en":"used to emphasize that something is completely true","example_en":"Yes, You're absolutely right.","ipa_example":"/jes jə ˈæbsəluːtlɪ raɪt/","vi":"Tout à fait","example_vi":"Oui, tu as absolument raison.","connect":"","image":"1F6XkaTLlSThsSW2sTmbM6_TM1SJG9ToN"},
  {"id":12,"word":"absorb","type":"(v)","ipa":"/əb'sɔ:b/","cefr_level":"B2","en":"to take in a liquid, gas or other substance from the surface or space around","example_en":"This paper does not absorb ink.","ipa_example":"/ðɪs ˈpeɪpə dʌz nɒt əbˈsɔːb ɪŋk/","vi":"absorber","example_vi":"Ce papier n'absorbe pas l'encre.","connect":"","image":"18HiiA6Die9fCQnFnMYILuqp4-464gPh8"},
  {"id":13,"word":"abuse","type":"(v, n)","ipa":"/ə'bju:s/","cefr_level":"B2","en":"to use something for the wrong purpose in a way that is harmful or morally wrong","example_en":"He abuses his authority.","ipa_example":"/hiː əˈbjuːsɪz hɪz ɔːˈθɒrɪtɪ/","vi":"abuser de","example_vi":"Il abuse de son autorité.","connect":"","image":"1xC-8tNQ5VH9gQx0OAo-BJ1VYOB_wy4o6"},
  {"id":14,"word":"academic","type":"(adj)","ipa":"/,ækə'demik/","cefr_level":"B2","en":"connected with education, especially studying in schools and universities","example_en":"His academic achievements are impressive.","ipa_example":"/hɪz ˌækəˈdemɪk əˈʧiːvmənts ə ɪmˈpresɪv/","vi":"académique","example_vi":"Ses réalisations académiques sont impressionnantes.","connect":"","image":"1801FKCgp7DE_gi9fZBoftLqmKumv_yZj"},
  {"id":15,"word":"accent","type":"(n)","ipa":"/'æksənt/","cefr_level":"B1","en":"a way of pronouncing the words of a language that shows which country, area or social class a person comes from","example_en":"She speaks with a southern accent.","ipa_example":"/ʃiː spiːks wɪð ə ˈsʌðən ˈæksənt/","vi":"accent","example_vi":"Elle parle avec un accent du sud.","connect":"","image":"1BzBiBsNLGUIQ2n6rdQX_YBfpSbJslcZL"},
  {"id":16,"word":"accept","type":"(v)","ipa":"/ək'sept/","cefr_level":"B1","en":"to take willingly something that is offered; to say ‘yes’ to an offer, invitation, etc","example_en":"Will you accept my invitation ?","ipa_example":"/wɪl jʊ əkˈsept maɪ ˌɪnvɪˈteɪʃən/","vi":"J’accepte","example_vi":"Accepterez-vous mon invitation ?","connect":"","image":"1m-hKcfOPKJEtwXLn1ZFJJma-G1InD0av"},
  {"id":17,"word":"acceptable","type":"(adj)","ipa":"/ək'septəbl/","cefr_level":"B1","en":"agreed or approved of by most people in a society","example_en":"We want a solution that is acceptable to all parties.","ipa_example":"/wi wɒnt ə səˈluːʃən ðæt ɪz əkˈseptəbl tʊ ɔːl pɑːˈtiːz/","vi":"acceptable","example_vi":"Nous voulons une solution acceptable pour toutes les parties.","connect":"","image":"1SCBJPNIqZEPJFxBFeSV6qjBAggfOk922"}
];

export async function POST(req) {
  const body = await req.json();
  const seenCardIds = body.seenCardIds || [];

  // Filter out cards that have already been seen
  const remainingCards = cards.filter((card) => !seenCardIds.includes(card.id));

  // Calculate progress (percentage of cards seen)
  const progress = {
    totalSeenCards: seenCardIds.length + 1,
    totalCards: cards.length
  }

  if (remainingCards.length === 0) {
    return new Response(
      JSON.stringify({ message: 'All cards read!', progress }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Select a random unseen card
  const randomCard = remainingCards[Math.floor(Math.random() * remainingCards.length)];

  return new Response(
    JSON.stringify({ card: randomCard, progress }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const cardId = searchParams.get('id');

  // Find the card with the provided ID
  const card = cards.find((card) => card.id === parseInt(cardId));

  if (card) {
    // Return the card's description (question/answer or both)
    return new Response(
      JSON.stringify({ card: {
        example_vi: card.example_vi,
        example_en: card.example_en,
      }}),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } else {
    return new Response(
      JSON.stringify({ message: 'Card not found' }),
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
