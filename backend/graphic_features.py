import numpy as np
from scipy.spatial.distance import cdist
import matplotlib.pyplot as plt


def trajectory_similarity(traj1, traj2):
    # 将轨迹表示为点的坐标矩阵
    traj1_coords = np.array(traj1)
    traj2_coords = np.array(traj2)

    # 计算轨迹形状的几何特征
    traj1_area = np.sum(traj1_coords[:, 0] * np.roll(traj1_coords[:, 1], 1) -
                         np.roll(traj1_coords[:, 0], 1) * traj1_coords[:, 1]) / 2
    traj2_area = np.sum(traj2_coords[:, 0] * np.roll(traj2_coords[:, 1], 1) -
                         np.roll(traj2_coords[:, 0], 1) * traj2_coords[:, 1]) / 2

    traj1_length = np.sum(np.sqrt(np.sum(np.diff(traj1_coords, axis=0) ** 2, axis=1)))
    traj2_length = np.sum(np.sqrt(np.sum(np.diff(traj2_coords, axis=0) ** 2, axis=1)))

    traj1_curvature = np.sum(np.abs(np.diff(np.arctan2(np.diff(traj1_coords[:, 1]),
                                                        np.diff(traj1_coords[:, 0])))))
    traj2_curvature = np.sum(np.abs(np.diff(np.arctan2(np.diff(traj2_coords[:, 1]),
                                                        np.diff(traj2_coords[:, 0])))))

    # 计算轨迹形状之间的距离
    area_distance = np.abs(traj1_area - traj2_area)
    length_distance = np.abs(traj1_length - traj2_length)
    curvature_distance = cdist(traj1_coords, traj2_coords, metric='euclidean').mean()

    # 将距离转换为相似度
    area_similarity = 1 / (1 + area_distance)
    length_similarity = 1 / (1 + length_distance)
    curvature_similarity = 1 / (1 + curvature_distance)

    # 计算总相似度
    similarity = np.mean([area_similarity, length_similarity, curvature_similarity])

    return similarity


# 示例
traj1 = [(1, 1), (2, 2), (3, 3)]
traj2 = [(1, 3), (2, 4)]

similarity = trajectory_similarity(traj1, traj2)

print(similarity)
