String.prototype.contains = function(str) {
	if (typeof str == 'string') {
		if (this.indexOf(str) > -1)
			return true
		else
			return false
	}
	else if (typeof str == 'object') {
		for (var i=0;i<str.length;i++) {
			if (this.indexOf(str[i]) > -1) 
				return true
		}
		return false
	}
}
String.prototype.replaceAll = function(replaceThis, withThis) {
	return this.split(replaceThis).join(withThis)
}
function stringToCharacter2(str) {
	//'6ks(6.7)'.match(/(?=.*\(.*\))(?=.*n|j|k|l|h|u|i|o)/)
	var rules = {

	}
}
function stringToCharacter(str) {
	var lhBasics = ['v', 'f', 'd', 's', 'x','c']
	var rhBasics = ['n','k','l','h','u','i','o']
	var rhPos3 = ['j']
	var lhPos3 = ['V']
	var uniCharMap = { "901": "char_b7_fancuo.svg","902": "char_b8_dacuo.svg","903": "char_b9_fancuo.svg","904": "char_by_cuo.svg","1005": "char_c_qiaqi.svg","1006": "char_d_zhong.svg","1007": "char_f_shi.svg","1008": "char_h_tuo.svg","1009": "char_i_ti.svg","1010": "char_j_mo.svg","1011": "char_k_gou.svg","1012": "char_l_da.svg","1013": "char_n_bo.svg","1014": "char_o_zhai.svg","1015": "char_s_ming.svg","1016": "char_u_tiao.svg","1017": "char_v_da.svg","1018": "char_V_yan.svg","1019": "char_x_gui.svg","1020": "halfLeft_fwdSlash_xia.svg","1021": "halfTop_0_san.svg","1022": "halfUpper_bckSlash_shang.svg","1023": "huiHalf_1_yi.svg","1024": "huiHalf_1huiHalf_shisan.svg","1025": "huiHalf_2_er.svg","1026": "huiHalf_3_san.svg","1027": "huiHalf_4_si.svg","1028": "huiHalf_5_wu.svg","1029": "huiHalf_6_liu.svg","1030": "huiHalf_7_qi.svg","1031": "huiHalf_8_ba.svg","1032": "huiHalf_9_jiu.svg","1033": "huiHalf_10_shi.svg","1034": "huiHalf_11_shiyi.svg","1035": "huiHalf_12_shier.svg","1036": "huiHalfBottom_1_yi.svg","1037": "huiHalfBottom_2_er.svg","1038": "huiHalfBottom_3_san.svg","1039": "huiHalfBottom_4_si.svg","1040": "huiHalfBottom_5_wu.svg","1041": "huiHalfBottom_6_liu.svg","1042": "huiHalfBottom_7_qi.svg","1043": "huiHalfBottom_8_ba.svg","1044": "huiHalfBottom_9_jiu.svg","1045": "huiHalfTop_1_yi.svg","1046": "huiHalfTop_2_er.svg","1047": "huiHalfTop_3_san.svg","1048": "huiHalfTop_4_si.svg","1049": "huiHalfTop_5_wu.svg","1050": "huiHalfTop_6_liu.svg","1051": "huiHalfTop_7_qi.svg","1052": "huiHalfTop_8_ba.svg","1053": "huiHalfTop_9_jiu.svg","1054": "huiHalfTop_10_shi.svg","1055": "huiHalfTop_11_shiyi.svg","1056": "huiHalfTop_12_shier.svg","1057": "huiHalfTop_13_shisan.svg","1058": "lhHalf_d_zhong.svg","1059": "lhHalf_f_shi.svg","1060": "lhHalf_s_ming.svg","1061": "lhHalf_v_da.svg","1062": "lhHalf_x_gui.svg","1063": "rhHalf_c_qiaqi.svg","1064": "rhHalf_h_tuo.svg","1065": "rhHalf_i_ti.svg","1066": "rhHalf_k_gou.svg","1067": "rhHalf_l_da.svg","1068": "rhHalf_n_bo.svg","1069": "rhHalf_o_zhai.svg","1070": "rhHalf_u_tiao.svg","1071": "rhThirdBottom_k_gou.svg","1072": "rhThirdBottom_u_tiao.svg","1073": "rhThirdTop_j_mo.svg","1074": "rhThirdTop_V_yan.svg","1075": "strHalf_1_yi.svg","1076": "strHalf_2_er.svg","1077": "strHalf_3_san.svg","1078": "strHalf_4_si.svg","1079": "strHalf_5_wu.svg","1080": "strHalf_6_liu.svg","1081": "strHalf_7_qi.svg","1082": "strThird_1_yi.svg","1083": "strThird_2_er.svg","1084": "strThird_3_san.svg","1085": "strThird_4_si.svg","1086": "strThird_5_wu.svg","1087": "strThird_6_liu.svg","1088": "strThird_7_qi.svg" }

	// Step 1. get posMaps
	var posMap = []
	var inHui = false
	var hui = ""
	for (var i=0;i<str.length;i++) {
		if (str[i].contains(lhBasics)) { // left hand
  		if ( str.contains(rhBasics) || (str.contains('(') && str.contains(')')) ) {
  			if (str[i] == "c") {
	  			posMap.push({char: str[i], position: "rhHalf"}) 
  			}
  			else {
	  			posMap.push({char: str[i], position: "lhHalf"}) // 2
  			}
  		}
  		else if (str.contains(rhPos3)) {
  			posMap.push({char: str[i], position: "lhHalf"}) //2
  		}
  		else {
  			posMap.push({char: str[i], position: -1}) 
  		}
		}
		else if (str[i].contains(rhBasics)) { // right hand
			if (str.contains(rhPos3)) {
				posMap.push({char: str[i], position: "rhThirdBottom"}) //2
			}
			else {
				posMap.push({char: str[i], position: "rhHalf"}) //2
			}
			// if (str.contains(lhBasics)) {
	  	// 		posMap.push({char: str[i], position: 2})
	  	// 	}
	  	// 	else if (str.contains("(0)")) { // empty string, no left hand
	  	// 		posMap.push({char: str[i], position: 2})
	  	// 	}
	  	// 	else {
	  	// 		posMap.push({char: str[i], position: 2})
	  	// 		// posMap.push({char: str[i], position: -1})
	  	// 	}
		}
		else if (str[i].contains(lhPos3)) {
			posMap.push({char: str[i], position: "rhThirdTop"})
			if (str[i] == "V") {
				posMap.push({char: "v", position: "lhHalf"})
			}
		}
		else if (str[i].contains(rhPos3)) {
			posMap.push({char: str[i], position: "rhThirdTop"})
		}
		// else if (str[i].contains('c')) {
		// 	if (str.contains(lhBasics)) {
		// 		posMap.push({char: str[i], position: 2})
		// 	}
		// }
		else if (str[i] == "(") { // hui starter
			inHui = true
		}
		else if (str[i] == ")" && inHui) { // hui closer, add hui nums to string
			huiArr = hui.split('.')
			// if (str.contains(lhBasics) && (str.contains(rhBasics) || str.contains(rhPos3))) {
			if (Number(hui) == 0) {
				posMap.push({char: hui, position: "halfTop"})
			}
			else if (huiArr.length == 1) {
				posMap.push({char: hui, position: "huiHalf"})
			}
			else if (huiArr.length == 2) {
				posMap.push({char: huiArr[0], position: "huiHalfTop"})
				posMap.push({char: huiArr[1], position: "huiHalfBottom"})
			}
			// else if (str.contains(lhBasics) || (str.contains(rhBasics) || str.contains(rhPos3))) {
			// 	if (huiArr.length == 1) {
			// 		posMap.push({char: hui, position: "huiHalf"})
			// 	}
			// 	else if (huiArr.length == 2) {
			// 		posMap.push({char: huiArr[0], position: "huiHalfTop"})
			// 		posMap.push({char: huiArr[1], position: "huiHalfBottom"})
			// 	}
			// }
			// else if (str.contains('V')) {
			// 	if (huiArr.length == 1) {
			// 		posMap.push({char: hui, position: "rhThirdTop"})
			// 	}
			// 	else if (huiArr.length == 2) {
			// 		posMap.push({char: huiArr[0], position: 4})
			// 		posMap.push({char: huiArr[1], position: 5})
			// 	}
			// }
			// else if (Number(hui) == 0) {
			// 	posMap.push({char: hui, position: 6})
			// }
			inHui = false
			hui = ""
		}
		else if (inHui) { // ignore hui middles
			hui += str[i]
		}
		else if (str[i] == '/') {
			posMap.push({char: 'bckSlash', position: "halfLeft"})
		}
		else if (str[i] == '\\') {
			posMap.push({char: 'fwdSlash', position: "halfUpper"}) // TODO: rename halfMid
		}
		else if (!isNaN(str[i])) { // string
			if (str.contains(rhPos3) || str.contains(lhPos3)) {
				posMap.push({char: str[i], position: "strThird"})
			}
			else if (str.contains(lhBasics) || str.contains(rhBasics)) {
				posMap.push({char: str[i], position: "strHalf"})
			}
			else if (str.contains("(0)") && str.contains(rhBasics)) {
				posMap.push({char: str[i], position: "strHalf"})
			}
			// else if (str.contains(rhPos3) || str.contains(lhPos3)) {
			// 	posMap.push({char: str[i], position: "strThird"})
			// }
			else {
				posMap.push({char: str[i], position: -1})
			}
		}
		else {
			posMap.push({char: str[i], position: -1})
		}
	}
	console.log(str, posMap)

	// Step 2. convert to unicode
	var charToUnicode = {}
	var outputString = "" 
	for (var k in uniCharMap) {
		var charArr = uniCharMap[k].replaceAll('.svg', '').split('_')
		if (charToUnicode[charArr[0]] == undefined) {
			charToUnicode[charArr[0]] = {}
		}
		charToUnicode[charArr[0]][charArr[1]] = k
	}
	for (var i=0;i<posMap.length;i++) {
		if (posMap[i].position == -1) {
			outputString += posMap[i].char
		}
		else {
			outputString += String.fromCharCode(charToUnicode[posMap[i].position][posMap[i].char])
		}
	}

	return outputString
}
function paragraphToCharacters(para) {
	var words = para.split(' ')
	for (var i=0;i<words.length;i++) {
		words[i] = stringToCharacter(words[i])
	}
	return words.join(' ')
}
$(document).ready(function() {
	$('.jzp-use-brackets').each(function() {
		var newDivHTML = $(this).html()


		newDivHTML = newDivHTML.replaceAll('[[[', '<span class="jzp jzp-use-characters">')
			.replaceAll(']]]', '</span>')
		$(this).html(newDivHTML)

		newDivHTML = newDivHTML.replaceAll('[[', '<span class="jzp">')
			.replaceAll(']]', '</span>')

		$(this).html(newDivHTML)
		$(this).find('.jzp-use-characters').each(function() {
			$(this).text(paragraphToCharacters($(this).text()))
		})
	})
})