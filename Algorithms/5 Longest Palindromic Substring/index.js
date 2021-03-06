/**
 * @param {string} s
 * @return {string}
 */
// 时间复杂度O(n^2)
var longestPalindrome = function(s) {
	if(s == null || s.length == 0) {
		return;
	}
	
	var i, j, k, 
		res = s[0],
		strTemp = '#';
		len = s.length;

	for(i = 0;i < len;i++) {
		strTemp += s[i] + '#';
	}

	s = strTemp;
	len = s.length;

	for(i = 0;i < len;i++) {
		j = i - 1;
		k = i + 1;

		while(j >= 0 && k <= len - 1) {
			if(s[j] !== s[k]) {
				strTemp = s.substring(j + 1, k);
				if(res.length < strTemp.length) {
					res = strTemp;
				}
				break;
			}
			else {
				strTemp = s.substring(j, k + 1);
				if(res.length < strTemp.length) {
					res = strTemp;
				}
			}

			j -= 1;
			k += 1;
		}
	}

	return res.replace(/#/g, '');
};


// Manacher算法，时间复杂度O(n)
var longestPalindrome = function(s) {
	if(s == null || s.length == 0) {
		return;
	}
	
	var i, RL, 
		pos = 0,
		res = s[0],
		resIndex = 0,
		maxLen = 0,
		maxRight = 0,
		len = s.length,
		strTemp = '#';
	
	for(i = 0;i < len;i++) {
		strTemp += s[i] + '#';
	}

	s = strTemp;
	len = s.length;
	RL = new Array(len);

	for(i = 0;i < len;i++) {
		if(i < maxRight) {
			RL[i] = Math.min(RL[2 * pos - i], maxRight - i);
		}
		else {
			RL[i] = 1;
		}

		while(i - RL[i] >= 0 && i + RL[i] < len && s[i - RL[i]] === s[i + RL[i]]) {
			RL[i] += 1;
		}

		if(RL[i] + i - 1 > maxRight) {
			maxRight = RL[i] + i - 1;
			pos = i
		}

		if(RL[i] > maxLen) {
			maxLen = RL[i];
			resIndex = i;
		}
	}

	return s.substring(resIndex - RL[resIndex] + 1, resIndex + RL[resIndex]).replace(/#/g, '');
};