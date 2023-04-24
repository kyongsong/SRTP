import math

import numpy as np

def dist(x1, y1, x2, y2):
    s = math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2))
    return s


def dtw(s, t, window):
    """
    :param s: 第一个序列
    :param t: 第二个序列
    :param window: the maximum window for matching.
    :return:
    """
    n, m = len(s), len(t)
    w = np.min([window, abs(n - m)])
    dtw_matrix = np.full((n + 1, m + 1), np.inf)
    dtw_matrix[0, 0] = 0

    for i in range(1, n + 1):
        for j in range(np.max([1, i - w]), np.min([i + w, m]) + 1):
            # 当前损失
            cost = dist(s[i - 1][0], s[i - 1][1],  t[j - 1][0], t[j - 1][1])

            # 上一个最小值
            last_min = np.min([dtw_matrix[i, j - 1], dtw_matrix[i - 1, j], dtw_matrix[i - 1, j - 1]])

            # 当前累积损失
            dtw_matrix[i, j] = last_min + cost
    return dtw_matrix
